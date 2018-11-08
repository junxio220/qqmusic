~function ($) {
    let $plan = $.Callbacks(),
        $mainBox = $('.mainBox'),
        $wrapper = $mainBox.find('.wrapper'),
        $headerBox = $('.headerBox'),
        $footerBox = $('.footerBox'),
        $already = $footerBox.find('.already'),
        $duration = $footerBox.find('.duration'),
        $run = $footerBox.find('.run'),
        audioBox = $('#audioBox')[0],
        $musicBtn = $headerBox.find('a');

    //=>渲染页面的时候把MAIN-BOX的高度动态进行计算
    ~function () {
        let winH = document.documentElement.clientHeight,
            font = $(document.documentElement).css('fontSize');
        font = parseFloat(font);
        $mainBox.css('height', winH - $headerBox[0].offsetHeight - $footerBox[0].offsetHeight - .8 * font);
    }();

    //=>把获取的歌词数据按照相关的规则进行格式化
    let formatData = result => {
        let {lyric} = result,
            ary = [];
        //=>第一步：先把一些特殊符号替换掉
        lyric = lyric.replace(/&#(\d+);/g, (...arg) => {
            let [bigRes, groupRes] = arg,
                value = bigRes;
            groupRes = parseFloat(groupRes);
            switch (groupRes) {
                case 32:
                    value = ' ';
                    break;
                case 40:
                    value = '(';
                    break;
                case 41:
                    value = ')';
                    break;
                case 45:
                    value = '-';
                    break;
            }
            return value;
        });

        //=>第二步：在最新的字符串中捕获需要的时间和歌词

        lyric.replace(/\[(\d+)&#58;(\d+)&#46;\d+\]([^&$;]+)(&#10;)/g, (...arg) => {
            let [, minutes, seconds, value] = arg;
            ary.push({
                minutes: minutes,
                seconds: seconds,
                value: value
            });
        });

        return ary;
    };

    //=>歌词绑定
    $plan.add(result => {
        let str = ``;
        result.forEach((item, index) => {
            let {minutes, seconds, value} = item;
            str += `<p data-minutes="${minutes}" data-seconds="${seconds}">${value}</p>`;
        });
        $wrapper.html(str);
    });

    //=>音乐的暂停和播放
    $plan.add(result => {
        //-> 播放
        audioBox.oncanplay = () => {
            //-> canplay:当前音频可以播放触发的事件（资源可能没有加载完成）
            $musicBtn.css('display', 'block').addClass('run');
        };
        audioBox.play();

        //-> 点击按钮控制暂停播放
        $musicBtn.tap(() => {
            if (audioBox.paused) {
                //-> 当前是暂停的
                audioBox.play();
                $musicBtn.addClass('run');
                return;
            }
            audioBox.pause();
            $musicBtn.removeClass('run');
        });
    });

    //=>歌词对应和进度更新
    $plan.add(result => {
        let autoTimer = setInterval(() => {
            //-> 获取总时间和已经播放的时间（单位S）
            let duration = audioBox.duration,
                curTime = audioBox.currentTime;

            //-> 歌词对应
            lyricProgress(duration, curTime);

            //-> 控制进度
            progressFn(duration, curTime);

            //-> 播放完成后暂停
            if(curTime >=duration){
                clearInterval(autoTimer);
                audioBox.pause();
                $musicBtn.removeClass('run');
            }
        }, 1000);

    });

    //=>歌词对应
    let lyricProgress = (duration, curTime) => {
        let minutes = Math.floor(curTime / 60),
            seconds = Math.round(curTime - minutes * 60);
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;

        let $pList = $wrapper.find('p'),
            $curP = $pList.filter(`[data-minutes="${minutes}"]`).filter(`[data-seconds="${seconds}"]`);
        if ($curP.length > 0) {
            $curP.addClass('select')
                .siblings().removeClass('select');

            //-> 控制wrapper向上移动
            let index = $curP.index();
            if (index >= 4) {
                let y = ($wrapper.attr('data-y') || 0) - .84;
                $wrapper.attr('data-y', y)
                    .css('transform', `translateY(${y}rem)`);
            }
        }
    };

    //=>控制进度
    let progressFn = (duration, curTime) => {
        let durText = computedT(duration),
            curText = computedT(curTime);
        $already.html(curText);
        $duration.html(durText);

        $run.css('width', curTime / duration * 100 + '%');
    };
    let computedT = (time) => {
        let minutes = Math.floor(time / 60),
            seconds = Math.round(time - minutes * 60);
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        return minutes + ':' + seconds;
    };

    //=>从服务器端获取歌词数据
    $.ajax({
        url: 'json/lyric.json',
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: result => {
            result = formatData(result);
            $plan.fire(result);
        }
    });


}(Zepto);