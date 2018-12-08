/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "196763796e36784f9f93";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/index.js")(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/css/index.less":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/css/index.less ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nexports.i(__webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./font.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/font.css\"), \"\");\n\n// Module\nexports.push([module.i, \"@charset \\\"UTF-8\\\";\\n/* css reset */\\n/**, *:before, *:after {\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}*/\\nbody,\\ndiv,\\ndl,\\ndt,\\ndd,\\nul,\\nol,\\nli,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\npre,\\ncode,\\nform,\\nfieldset,\\nlegend,\\ninput,\\nbutton,\\ntextarea,\\np,\\nblockquote,\\nth,\\ntd {\\n  margin: 0;\\n  padding: 0;\\n}\\nfieldset,\\nimg {\\n  border: 0;\\n}\\n:focus {\\n  outline: 0;\\n}\\naddress,\\ncaption,\\ncite,\\ncode,\\ndfn,\\nem,\\nstrong,\\nth,\\nvar,\\noptgroup {\\n  font-style: normal;\\n  font-weight: normal;\\n}\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6 {\\n  font-size: 100%;\\n  font-weight: normal;\\n  font-family: \\\"Microsoft YaHei\\\";\\n}\\nabbr,\\nacronym {\\n  border: 0;\\n  font-variant: normal;\\n}\\ncode,\\nkbd,\\nsamp,\\ntt {\\n  font-size: 100%;\\n}\\ninput,\\nbutton,\\ntextarea,\\nselect {\\n  *font-size: 100%;\\n  border: none;\\n}\\nbody {\\n  background: #fff;\\n  color: #5e5e5e;\\n  font: 14px/2em Microsoft YaHei, SimSun, Arial;\\n}\\nol,\\nul {\\n  list-style: none;\\n}\\ntable {\\n  border-collapse: collapse;\\n  border-spacing: 0;\\n}\\ncaption,\\nth {\\n  text-align: left;\\n}\\nsup,\\nsub {\\n  font-size: 100%;\\n  vertical-align: baseline;\\n}\\n:link,\\n:visited,\\nins {\\n  text-decoration: none;\\n}\\nblockquote,\\nq {\\n  quotes: none;\\n}\\nblockquote:before,\\nblockquote:after,\\nq:before,\\nq:after {\\n  content: '';\\n  content: none;\\n}\\na:link,\\na:visited {\\n  color: #5e5e5e;\\n}\\na:hover {\\n  color: #c9394a;\\n}\\na:active {\\n  color: #666;\\n}\\n.clearfix:after {\\n  content: '';\\n  display: block;\\n  height: 0;\\n  clear: both;\\n  visibility: hidden;\\n}\\n.clearfix {\\n  *zoom: 1;\\n}\\n.l {\\n  float: left;\\n}\\n.r {\\n  float: right;\\n}\\n.clear {\\n  height: 0;\\n  overflow: hidden;\\n  clear: both;\\n}\\nhtml {\\n  font-size: 100px;\\n  /*640px: 1rem = 100px*/\\n}\\nhtml,\\nbody {\\n  height: 100%;\\n  overflow: hidden;\\n}\\n.container {\\n  height: 100%;\\n  overflow: hidden;\\n  position: relative;\\n}\\n.container .bg {\\n  display: block;\\n  height: 100%;\\n  overflow: hidden;\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  z-index: -2;\\n  -webkit-filter: blur(3px);\\n  filter: blur(3px);\\n}\\n.container .bgMark {\\n  width: 100%;\\n  height: 100%;\\n  overflow: hidden;\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  z-index: -1;\\n  background: rgba(0, 0, 0, 0.5);\\n}\\n/*--HEADER--*/\\n.headerBox {\\n  position: relative;\\n  padding: 0.3rem;\\n  height: 1.2rem;\\n  background: rgba(0, 0, 0, 0.3);\\n}\\n.headerBox img {\\n  position: absolute;\\n  left: 0.3rem;\\n  top: 0.3rem;\\n  width: 1.2rem;\\n  height: 1.2rem;\\n}\\n.headerBox h1,\\n.headerBox h2 {\\n  padding-left: 1.5rem;\\n  line-height: 0.6rem;\\n  color: #fff;\\n  font-size: 0.36rem;\\n  font-weight: normal;\\n}\\n.headerBox h2 {\\n  font-size: 0.32rem;\\n}\\n.headerBox a {\\n  display: none;\\n  position: absolute;\\n  right: 0.3rem;\\n  top: 50%;\\n  margin-top: -0.3rem;\\n  width: 0.6rem;\\n  height: 0.6rem;\\n  text-align: center;\\n  line-height: 0.6rem;\\n  z-index: 2;\\n}\\n.headerBox a.run {\\n  -webkit-animation: musicMove 3s linear 0s infinite both;\\n  animation: musicMove 3s linear 0s infinite both;\\n}\\n.headerBox a:before {\\n  font-size: 0.5rem;\\n  color: #fff;\\n}\\n.headerBox a .music-control-btn {\\n  font-family: 'iconfont';\\n  color: #fff;\\n  font-size: 0.6rem;\\n  line-height: 0.6rem;\\n}\\n@-webkit-keyframes musicMove {\\n  0% {\\n    -webkit-transform: rotate(0deg);\\n    transform: rotate(0deg);\\n  }\\n  100% {\\n    -webkit-transform: rotate(360deg);\\n    transform: rotate(360deg);\\n  }\\n}\\n@keyframes musicMove {\\n  0% {\\n    -webkit-transform: rotate(0deg);\\n    transform: rotate(0deg);\\n  }\\n  100% {\\n    -webkit-transform: rotate(360deg);\\n    transform: rotate(360deg);\\n  }\\n}\\n/*--MAIN--*/\\n.mainBox {\\n  position: relative;\\n  margin: 0.4rem 0.2rem;\\n  overflow: hidden;\\n}\\n.mainBox .wrapper {\\n  position: absolute;\\n  left: 0;\\n  top: 0;\\n  width: 100%;\\n  -webkit-transition: all 0.3s linear 0s;\\n  transition: all 0.3s linear 0s;\\n}\\n.mainBox .wrapper p {\\n  line-height: 0.84rem;\\n  text-align: center;\\n  color: rgba(255, 255, 255, 0.5);\\n  font-size: 0.32rem;\\n  letter-spacing: 0.04rem;\\n  text-overflow: ellipsis;\\n  white-space: nowrap;\\n  overflow: hidden;\\n}\\n.mainBox .wrapper p.select {\\n  color: #31c27c;\\n  -webkit-transition: all 0.3s linear 0s;\\n  transition: all 0.3s linear 0s;\\n}\\n/*--FOOTER--*/\\n.footerBox {\\n  position: relative;\\n  margin: 0 0.2rem;\\n  height: 2.2rem;\\n}\\n.footerBox .down {\\n  display: block;\\n  margin: 0 auto;\\n  width: 4.4rem;\\n  height: 0.9rem;\\n  line-height: 0.9rem;\\n  text-align: center;\\n  color: #fff;\\n  font-size: 0.36rem;\\n  border-radius: 0.45rem;\\n  background: url(\\\"https://cdn.junxio.site/static/demo/qq_music/img/QQmusic.png\\\") no-repeat #31c27c;\\n  background-size: 0.7rem 0.7rem;\\n  background-position-x: 0.15rem;\\n  background-position-y: 0.1rem;\\n}\\n.footerBox .down:active {\\n  background-color: #1c7148;\\n}\\n.footerBox .progress {\\n  height: 0.8rem;\\n  line-height: 0.8rem;\\n  font-size: 0;\\n}\\n.footerBox .progress span,\\n.footerBox .progress div {\\n  display: inline-block;\\n  height: 100%;\\n}\\n.footerBox .progress span {\\n  width: 0.9rem;\\n  height: 100%;\\n  text-align: center;\\n  color: rgba(255, 255, 255, 0.5);\\n  font-size: 0.24rem;\\n  vertical-align: middle;\\n}\\n.footerBox .progress .pro {\\n  position: relative;\\n  width: 4.2rem;\\n  height: 0.04rem;\\n  background: rgba(255, 255, 255, 0.5);\\n  vertical-align: middle;\\n}\\n.footerBox .progress .pro .run {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 0;\\n  height: 100%;\\n  background: #31c27c;\\n  -webkit-transition: all 1s linear 0s;\\n  transition: all 1s linear 0s;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/css/index.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/font.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/font.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"@font-face {\\n  font-family: 'iconfont';\\n  src: url('//at.alicdn.com/t/font_952972_a43n9hpf94m.eot');\\n  src: url('//at.alicdn.com/t/font_952972_a43n9hpf94m.eot?#iefix') format('embedded-opentype'),\\n  url('//at.alicdn.com/t/font_952972_a43n9hpf94m.woff') format('woff'),\\n  url('//at.alicdn.com/t/font_952972_a43n9hpf94m.ttf') format('truetype'),\\n  url('//at.alicdn.com/t/font_952972_a43n9hpf94m.svg#iconfont') format('svg');\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/css/font.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/css/index.less":
/*!****************************!*\
  !*** ./src/css/index.less ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/css/index.less\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/css/index.less\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/css/index.less\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/css/index.less?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.less */ \"./src/css/index.less\");\n/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_index_less__WEBPACK_IMPORTED_MODULE_0__);\nconst Zepto = __webpack_require__(/*! ./zepto */ \"./src/js/zepto.js\");\r\n\r\n\r\n~(function($) {\r\n  let $plan = $.Callbacks(),\r\n    $mainBox = $(\".mainBox\"),\r\n    $wrapper = $mainBox.find(\".wrapper\"),\r\n    $headerBox = $(\".headerBox\"),\r\n    $footerBox = $(\".footerBox\"),\r\n    $already = $footerBox.find(\".already\"),\r\n    $duration = $footerBox.find(\".duration\"),\r\n    $run = $footerBox.find(\".run\"),\r\n    audioBox = $(\"#audioBox\")[0],\r\n    $musicBtn = $headerBox.find(\"a\");\r\n\r\n  //=>渲染页面的时候把MAIN-BOX的高度动态进行计算\r\n  ~(function() {\r\n    function initMainBox() {\r\n      let winH = document.documentElement.clientHeight,\r\n        font = $(document.documentElement).css(\"fontSize\");\r\n      font = parseFloat(font);\r\n      $mainBox.css(\r\n        \"height\",\r\n        winH -\r\n          $headerBox[0].offsetHeight -\r\n          $footerBox[0].offsetHeight -\r\n          0.8 * font\r\n      );\r\n    }\r\n    initMainBox();\r\n    window.addEventListener(\"resize\", initMainBox);\r\n  })();\r\n\r\n  //=>把获取的歌词数据按照相关的规则进行格式化\r\n  let formatData = result => {\r\n    let { lyric } = result,\r\n      ary = [];\r\n    //=>第一步：先把一些特殊符号替换掉\r\n    lyric = lyric.replace(/&#(\\d+);/g, (...arg) => {\r\n      let [bigRes, groupRes] = arg,\r\n        value = bigRes;\r\n      groupRes = parseFloat(groupRes);\r\n      switch (groupRes) {\r\n        case 32:\r\n          value = \" \";\r\n          break;\r\n        case 40:\r\n          value = \"(\";\r\n          break;\r\n        case 41:\r\n          value = \")\";\r\n          break;\r\n        case 45:\r\n          value = \"-\";\r\n          break;\r\n      }\r\n      return value;\r\n    });\r\n\r\n    //=>第二步：在最新的字符串中捕获需要的时间和歌词\r\n\r\n    lyric.replace(/\\[(\\d+)&#58;(\\d+)&#46;\\d+\\]([^&$;]+)(&#10;)/g, (...arg) => {\r\n      let [, minutes, seconds, value] = arg;\r\n      ary.push({\r\n        minutes: minutes,\r\n        seconds: seconds,\r\n        value: value\r\n      });\r\n    });\r\n\r\n    return ary;\r\n  };\r\n\r\n  //=>歌词绑定\r\n  $plan.add(result => {\r\n    let str = ``;\r\n    result.forEach((item, index) => {\r\n      let { minutes, seconds, value } = item;\r\n      str += `<p data-minutes=\"${minutes}\" data-seconds=\"${seconds}\">${value}</p>`;\r\n    });\r\n    $wrapper.html(str);\r\n  });\r\n\r\n  //=>音乐的暂停和播放\r\n  $plan.add(result => {\r\n    //-> 播放\r\n    audioBox.oncanplay = () => {\r\n      //-> canplay:当前音频可以播放触发的事件（资源可能没有加载完成）\r\n      $musicBtn.css(\"display\", \"block\").addClass(\"run\");\r\n    };\r\n    audioBox.play();\r\n    //-> 点击按钮控制暂停播放\r\n    $musicBtn.tap(() => {\r\n      if (audioBox.paused) {\r\n        //-> 当前是暂停的\r\n        audioBox.play();\r\n        $musicBtn.addClass(\"run\");\r\n        return;\r\n      }\r\n      audioBox.pause();\r\n      $musicBtn.removeClass(\"run\");\r\n    });\r\n  });\r\n\r\n  //=>歌词对应和进度更新\r\n  $plan.add(result => {\r\n    let autoTimer = setInterval(() => {\r\n      //-> 获取总时间和已经播放的时间（单位S）\r\n      let duration = isNaN(audioBox.duration) ? 0 : audioBox.duration,\r\n        curTime = audioBox.currentTime;\r\n      \r\n      //-> 歌词对应\r\n      lyricProgress(duration, curTime);\r\n\r\n      //-> 控制进度\r\n      progressFn(duration, curTime);\r\n\r\n      //-> 播放完成后暂停\r\n      if (curTime >= duration) {\r\n        clearInterval(autoTimer);\r\n        audioBox.pause();\r\n        $musicBtn.removeClass(\"run\");\r\n      }\r\n    }, 1000);\r\n  });\r\n\r\n  //=>歌词对应\r\n  let lyricProgress = (duration, curTime) => {\r\n    let minutes = Math.floor(curTime / 60),\r\n      seconds = Math.round(curTime - minutes * 60);\r\n    minutes < 10 ? (minutes = \"0\" + minutes) : null;\r\n    seconds < 10 ? (seconds = \"0\" + seconds) : null;\r\n\r\n    let $pList = $wrapper.find(\"p\"),\r\n      $curP = $pList\r\n        .filter(`[data-minutes=\"${minutes}\"]`)\r\n        .filter(`[data-seconds=\"${seconds}\"]`);\r\n    if ($curP.length > 0) {\r\n      $curP\r\n        .addClass(\"select\")\r\n        .siblings()\r\n        .removeClass(\"select\");\r\n\r\n      //-> 控制wrapper向上移动\r\n      let index = $curP.index();\r\n      if (index >= 4) {\r\n        let y = ($wrapper.attr(\"data-y\") || 0) - 0.84;\r\n        $wrapper.attr(\"data-y\", y).css(\"transform\", `translateY(${y}rem)`);\r\n      }\r\n    }\r\n  };\r\n\r\n  //=>控制进度\r\n  let progressFn = (duration, curTime) => {\r\n    let curText = computedT(curTime),\r\n      durText = computedT(duration);\r\n    $already.html(curText);\r\n    $duration.html(durText);\r\n\r\n    $run.css(\"width\", (curTime / duration) * 100 + \"%\");\r\n  };\r\n\r\n  let computedT = time => {\r\n    let minutes = Math.floor(time / 60),\r\n      seconds = Math.round(time - minutes * 60);\r\n    minutes < 10 ? (minutes = \"0\" + minutes) : null;\r\n    seconds < 10 ? (seconds = \"0\" + seconds) : null;\r\n    return minutes + \":\" + seconds;\r\n  };\r\n\r\n  //=>从服务器端获取歌词数据\r\n  $.ajax({\r\n    url: \"json/lyric.json\",\r\n    type: \"GET\",\r\n    dataType: \"json\",\r\n    cache: false,\r\n    beforeSend: xhr => {\r\n      // 缓存头处理\r\n    },\r\n    success: result => {\r\n      result = formatData(result);\r\n      $plan.fire(result);\r\n    }\r\n  });\r\n})(Zepto);\r\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/zepto.js":
/*!*************************!*\
  !*** ./src/js/zepto.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */\r\n(function(global, factory) {\r\n    if (true)\r\n        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return factory(global) }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\r\n    else\r\n        {}\r\n}(window, function(window) {\r\n    var Zepto = (function() {\r\n        var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,\r\n            document = window.document,\r\n            elementDisplay = {}, classCache = {},\r\n            cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },\r\n            fragmentRE = /^\\s*<(\\w+|!)[^>]*>/,\r\n            singleTagRE = /^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/,\r\n            tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/ig,\r\n            rootNodeRE = /^(?:body|html)$/i,\r\n            capitalRE = /([A-Z])/g,\r\n\r\n            // special attributes that should be get/set via method calls\r\n            methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],\r\n\r\n            adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],\r\n            table = document.createElement('table'),\r\n            tableRow = document.createElement('tr'),\r\n            containers = {\r\n                'tr': document.createElement('tbody'),\r\n                'tbody': table, 'thead': table, 'tfoot': table,\r\n                'td': tableRow, 'th': tableRow,\r\n                '*': document.createElement('div')\r\n            },\r\n            readyRE = /complete|loaded|interactive/,\r\n            simpleSelectorRE = /^[\\w-]*$/,\r\n            class2type = {},\r\n            toString = class2type.toString,\r\n            zepto = {},\r\n            camelize, uniq,\r\n            tempParent = document.createElement('div'),\r\n            propMap = {\r\n                'tabindex': 'tabIndex',\r\n                'readonly': 'readOnly',\r\n                'for': 'htmlFor',\r\n                'class': 'className',\r\n                'maxlength': 'maxLength',\r\n                'cellspacing': 'cellSpacing',\r\n                'cellpadding': 'cellPadding',\r\n                'rowspan': 'rowSpan',\r\n                'colspan': 'colSpan',\r\n                'usemap': 'useMap',\r\n                'frameborder': 'frameBorder',\r\n                'contenteditable': 'contentEditable'\r\n            },\r\n            isArray = Array.isArray ||\r\n                function(object){ return object instanceof Array }\r\n\r\n        zepto.matches = function(element, selector) {\r\n            if (!selector || !element || element.nodeType !== 1) return false\r\n            var matchesSelector = element.matches || element.webkitMatchesSelector ||\r\n                element.mozMatchesSelector || element.oMatchesSelector ||\r\n                element.matchesSelector\r\n            if (matchesSelector) return matchesSelector.call(element, selector)\r\n            // fall back to performing a selector:\r\n            var match, parent = element.parentNode, temp = !parent\r\n            if (temp) (parent = tempParent).appendChild(element)\r\n            match = ~zepto.qsa(parent, selector).indexOf(element)\r\n            temp && tempParent.removeChild(element)\r\n            return match\r\n        }\r\n\r\n        function type(obj) {\r\n            return obj == null ? String(obj) :\r\n                class2type[toString.call(obj)] || \"object\"\r\n        }\r\n\r\n        function isFunction(value) { return type(value) == \"function\" }\r\n        function isWindow(obj)     { return obj != null && obj == obj.window }\r\n        function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }\r\n        function isObject(obj)     { return type(obj) == \"object\" }\r\n        function isPlainObject(obj) {\r\n            return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype\r\n        }\r\n\r\n        function likeArray(obj) {\r\n            var length = !!obj && 'length' in obj && obj.length,\r\n                type = $.type(obj)\r\n\r\n            return 'function' != type && !isWindow(obj) && (\r\n                'array' == type || length === 0 ||\r\n                (typeof length == 'number' && length > 0 && (length - 1) in obj)\r\n            )\r\n        }\r\n\r\n        function compact(array) { return filter.call(array, function(item){ return item != null }) }\r\n        function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }\r\n        camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }\r\n        function dasherize(str) {\r\n            return str.replace(/::/g, '/')\r\n                .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')\r\n                .replace(/([a-z\\d])([A-Z])/g, '$1_$2')\r\n                .replace(/_/g, '-')\r\n                .toLowerCase()\r\n        }\r\n        uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }\r\n\r\n        function classRE(name) {\r\n            return name in classCache ?\r\n                classCache[name] : (classCache[name] = new RegExp('(^|\\\\s)' + name + '(\\\\s|$)'))\r\n        }\r\n\r\n        function maybeAddPx(name, value) {\r\n            return (typeof value == \"number\" && !cssNumber[dasherize(name)]) ? value + \"px\" : value\r\n        }\r\n\r\n        function defaultDisplay(nodeName) {\r\n            var element, display\r\n            if (!elementDisplay[nodeName]) {\r\n                element = document.createElement(nodeName)\r\n                document.body.appendChild(element)\r\n                display = getComputedStyle(element, '').getPropertyValue(\"display\")\r\n                element.parentNode.removeChild(element)\r\n                display == \"none\" && (display = \"block\")\r\n                elementDisplay[nodeName] = display\r\n            }\r\n            return elementDisplay[nodeName]\r\n        }\r\n\r\n        function children(element) {\r\n            return 'children' in element ?\r\n                slice.call(element.children) :\r\n                $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })\r\n        }\r\n\r\n        function Z(dom, selector) {\r\n            var i, len = dom ? dom.length : 0\r\n            for (i = 0; i < len; i++) this[i] = dom[i]\r\n            this.length = len\r\n            this.selector = selector || ''\r\n        }\r\n\r\n        // `$.zepto.fragment` takes a html string and an optional tag name\r\n        // to generate DOM nodes from the given html string.\r\n        // The generated DOM nodes are returned as an array.\r\n        // This function can be overridden in plugins for example to make\r\n        // it compatible with browsers that don't support the DOM fully.\r\n        zepto.fragment = function(html, name, properties) {\r\n            var dom, nodes, container\r\n\r\n            // A special case optimization for a single tag\r\n            if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))\r\n\r\n            if (!dom) {\r\n                if (html.replace) html = html.replace(tagExpanderRE, \"<$1></$2>\")\r\n                if (name === undefined) name = fragmentRE.test(html) && RegExp.$1\r\n                if (!(name in containers)) name = '*'\r\n\r\n                container = containers[name]\r\n                container.innerHTML = '' + html\r\n                dom = $.each(slice.call(container.childNodes), function(){\r\n                    container.removeChild(this)\r\n                })\r\n            }\r\n\r\n            if (isPlainObject(properties)) {\r\n                nodes = $(dom)\r\n                $.each(properties, function(key, value) {\r\n                    if (methodAttributes.indexOf(key) > -1) nodes[key](value)\r\n                    else nodes.attr(key, value)\r\n                })\r\n            }\r\n\r\n            return dom\r\n        }\r\n\r\n        // `$.zepto.Z` swaps out the prototype of the given `dom` array\r\n        // of nodes with `$.fn` and thus supplying all the Zepto functions\r\n        // to the array. This method can be overridden in plugins.\r\n        zepto.Z = function(dom, selector) {\r\n            return new Z(dom, selector)\r\n        }\r\n\r\n        // `$.zepto.isZ` should return `true` if the given object is a Zepto\r\n        // collection. This method can be overridden in plugins.\r\n        zepto.isZ = function(object) {\r\n            return object instanceof zepto.Z\r\n        }\r\n\r\n        // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and\r\n        // takes a CSS selector and an optional context (and handles various\r\n        // special cases).\r\n        // This method can be overridden in plugins.\r\n        zepto.init = function(selector, context) {\r\n            var dom\r\n            // If nothing given, return an empty Zepto collection\r\n            if (!selector) return zepto.Z()\r\n            // Optimize for string selectors\r\n            else if (typeof selector == 'string') {\r\n                selector = selector.trim()\r\n                // If it's a html fragment, create nodes from it\r\n                // Note: In both Chrome 21 and Firefox 15, DOM error 12\r\n                // is thrown if the fragment doesn't begin with <\r\n                if (selector[0] == '<' && fragmentRE.test(selector))\r\n                    dom = zepto.fragment(selector, RegExp.$1, context), selector = null\r\n                // If there's a context, create a collection on that context first, and select\r\n                // nodes from there\r\n                else if (context !== undefined) return $(context).find(selector)\r\n                // If it's a CSS selector, use it to select nodes.\r\n                else dom = zepto.qsa(document, selector)\r\n            }\r\n            // If a function is given, call it when the DOM is ready\r\n            else if (isFunction(selector)) return $(document).ready(selector)\r\n            // If a Zepto collection is given, just return it\r\n            else if (zepto.isZ(selector)) return selector\r\n            else {\r\n                // normalize array if an array of nodes is given\r\n                if (isArray(selector)) dom = compact(selector)\r\n                // Wrap DOM nodes.\r\n                else if (isObject(selector))\r\n                    dom = [selector], selector = null\r\n                // If it's a html fragment, create nodes from it\r\n                else if (fragmentRE.test(selector))\r\n                    dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null\r\n                // If there's a context, create a collection on that context first, and select\r\n                // nodes from there\r\n                else if (context !== undefined) return $(context).find(selector)\r\n                // And last but no least, if it's a CSS selector, use it to select nodes.\r\n                else dom = zepto.qsa(document, selector)\r\n            }\r\n            // create a new Zepto collection from the nodes found\r\n            return zepto.Z(dom, selector)\r\n        }\r\n\r\n        // `$` will be the base `Zepto` object. When calling this\r\n        // function just call `$.zepto.init, which makes the implementation\r\n        // details of selecting nodes and creating Zepto collections\r\n        // patchable in plugins.\r\n        $ = function(selector, context){\r\n            return zepto.init(selector, context)\r\n        }\r\n\r\n        function extend(target, source, deep) {\r\n            for (key in source)\r\n                if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {\r\n                    if (isPlainObject(source[key]) && !isPlainObject(target[key]))\r\n                        target[key] = {}\r\n                    if (isArray(source[key]) && !isArray(target[key]))\r\n                        target[key] = []\r\n                    extend(target[key], source[key], deep)\r\n                }\r\n                else if (source[key] !== undefined) target[key] = source[key]\r\n        }\r\n\r\n        // Copy all but undefined properties from one or more\r\n        // objects to the `target` object.\r\n        $.extend = function(target){\r\n            var deep, args = slice.call(arguments, 1)\r\n            if (typeof target == 'boolean') {\r\n                deep = target\r\n                target = args.shift()\r\n            }\r\n            args.forEach(function(arg){ extend(target, arg, deep) })\r\n            return target\r\n        }\r\n\r\n        // `$.zepto.qsa` is Zepto's CSS selector implementation which\r\n        // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.\r\n        // This method can be overridden in plugins.\r\n        zepto.qsa = function(element, selector){\r\n            var found,\r\n                maybeID = selector[0] == '#',\r\n                maybeClass = !maybeID && selector[0] == '.',\r\n                nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked\r\n                isSimple = simpleSelectorRE.test(nameOnly)\r\n            return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById\r\n                ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :\r\n                (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :\r\n                    slice.call(\r\n                        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName\r\n                            maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class\r\n                                element.getElementsByTagName(selector) : // Or a tag\r\n                            element.querySelectorAll(selector) // Or it's not simple, and we need to query all\r\n                    )\r\n        }\r\n\r\n        function filtered(nodes, selector) {\r\n            return selector == null ? $(nodes) : $(nodes).filter(selector)\r\n        }\r\n\r\n        $.contains = document.documentElement.contains ?\r\n            function(parent, node) {\r\n                return parent !== node && parent.contains(node)\r\n            } :\r\n            function(parent, node) {\r\n                while (node && (node = node.parentNode))\r\n                    if (node === parent) return true\r\n                return false\r\n            }\r\n\r\n        function funcArg(context, arg, idx, payload) {\r\n            return isFunction(arg) ? arg.call(context, idx, payload) : arg\r\n        }\r\n\r\n        function setAttribute(node, name, value) {\r\n            value == null ? node.removeAttribute(name) : node.setAttribute(name, value)\r\n        }\r\n\r\n        // access className property while respecting SVGAnimatedString\r\n        function className(node, value){\r\n            var klass = node.className || '',\r\n                svg   = klass && klass.baseVal !== undefined\r\n\r\n            if (value === undefined) return svg ? klass.baseVal : klass\r\n            svg ? (klass.baseVal = value) : (node.className = value)\r\n        }\r\n\r\n        // \"true\"  => true\r\n        // \"false\" => false\r\n        // \"null\"  => null\r\n        // \"42\"    => 42\r\n        // \"42.5\"  => 42.5\r\n        // \"08\"    => \"08\"\r\n        // JSON    => parse if valid\r\n        // String  => self\r\n        function deserializeValue(value) {\r\n            try {\r\n                return value ?\r\n                    value == \"true\" ||\r\n                    ( value == \"false\" ? false :\r\n                        value == \"null\" ? null :\r\n                            +value + \"\" == value ? +value :\r\n                                /^[\\[\\{]/.test(value) ? $.parseJSON(value) :\r\n                                    value )\r\n                    : value\r\n            } catch(e) {\r\n                return value\r\n            }\r\n        }\r\n\r\n        $.type = type\r\n        $.isFunction = isFunction\r\n        $.isWindow = isWindow\r\n        $.isArray = isArray\r\n        $.isPlainObject = isPlainObject\r\n\r\n        $.isEmptyObject = function(obj) {\r\n            var name\r\n            for (name in obj) return false\r\n            return true\r\n        }\r\n\r\n        $.isNumeric = function(val) {\r\n            var num = Number(val), type = typeof val\r\n            return val != null && type != 'boolean' &&\r\n                (type != 'string' || val.length) &&\r\n                !isNaN(num) && isFinite(num) || false\r\n        }\r\n\r\n        $.inArray = function(elem, array, i){\r\n            return emptyArray.indexOf.call(array, elem, i)\r\n        }\r\n\r\n        $.camelCase = camelize\r\n        $.trim = function(str) {\r\n            return str == null ? \"\" : String.prototype.trim.call(str)\r\n        }\r\n\r\n        // plugin compatibility\r\n        $.uuid = 0\r\n        $.support = { }\r\n        $.expr = { }\r\n        $.noop = function() {}\r\n\r\n        $.map = function(elements, callback){\r\n            var value, values = [], i, key\r\n            if (likeArray(elements))\r\n                for (i = 0; i < elements.length; i++) {\r\n                    value = callback(elements[i], i)\r\n                    if (value != null) values.push(value)\r\n                }\r\n            else\r\n                for (key in elements) {\r\n                    value = callback(elements[key], key)\r\n                    if (value != null) values.push(value)\r\n                }\r\n            return flatten(values)\r\n        }\r\n\r\n        $.each = function(elements, callback){\r\n            var i, key\r\n            if (likeArray(elements)) {\r\n                for (i = 0; i < elements.length; i++)\r\n                    if (callback.call(elements[i], i, elements[i]) === false) return elements\r\n            } else {\r\n                for (key in elements)\r\n                    if (callback.call(elements[key], key, elements[key]) === false) return elements\r\n            }\r\n\r\n            return elements\r\n        }\r\n\r\n        $.grep = function(elements, callback){\r\n            return filter.call(elements, callback)\r\n        }\r\n\r\n        if (window.JSON) $.parseJSON = JSON.parse\r\n\r\n        // Populate the class2type map\r\n        $.each(\"Boolean Number String Function Array Date RegExp Object Error\".split(\" \"), function(i, name) {\r\n            class2type[ \"[object \" + name + \"]\" ] = name.toLowerCase()\r\n        })\r\n\r\n        // Define methods that will be available on all\r\n        // Zepto collections\r\n        $.fn = {\r\n            constructor: zepto.Z,\r\n            length: 0,\r\n\r\n            // Because a collection acts like an array\r\n            // copy over these useful array functions.\r\n            forEach: emptyArray.forEach,\r\n            reduce: emptyArray.reduce,\r\n            push: emptyArray.push,\r\n            sort: emptyArray.sort,\r\n            splice: emptyArray.splice,\r\n            indexOf: emptyArray.indexOf,\r\n            concat: function(){\r\n                var i, value, args = []\r\n                for (i = 0; i < arguments.length; i++) {\r\n                    value = arguments[i]\r\n                    args[i] = zepto.isZ(value) ? value.toArray() : value\r\n                }\r\n                return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)\r\n            },\r\n\r\n            // `map` and `slice` in the jQuery API work differently\r\n            // from their array counterparts\r\n            map: function(fn){\r\n                return $($.map(this, function(el, i){ return fn.call(el, i, el) }))\r\n            },\r\n            slice: function(){\r\n                return $(slice.apply(this, arguments))\r\n            },\r\n\r\n            ready: function(callback){\r\n                // need to check if document.body exists for IE as that browser reports\r\n                // document ready when it hasn't yet created the body element\r\n                if (readyRE.test(document.readyState) && document.body) callback($)\r\n                else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)\r\n                return this\r\n            },\r\n            get: function(idx){\r\n                return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]\r\n            },\r\n            toArray: function(){ return this.get() },\r\n            size: function(){\r\n                return this.length\r\n            },\r\n            remove: function(){\r\n                return this.each(function(){\r\n                    if (this.parentNode != null)\r\n                        this.parentNode.removeChild(this)\r\n                })\r\n            },\r\n            each: function(callback){\r\n                emptyArray.every.call(this, function(el, idx){\r\n                    return callback.call(el, idx, el) !== false\r\n                })\r\n                return this\r\n            },\r\n            filter: function(selector){\r\n                if (isFunction(selector)) return this.not(this.not(selector))\r\n                return $(filter.call(this, function(element){\r\n                    return zepto.matches(element, selector)\r\n                }))\r\n            },\r\n            add: function(selector,context){\r\n                return $(uniq(this.concat($(selector,context))))\r\n            },\r\n            is: function(selector){\r\n                return this.length > 0 && zepto.matches(this[0], selector)\r\n            },\r\n            not: function(selector){\r\n                var nodes=[]\r\n                if (isFunction(selector) && selector.call !== undefined)\r\n                    this.each(function(idx){\r\n                        if (!selector.call(this,idx)) nodes.push(this)\r\n                    })\r\n                else {\r\n                    var excludes = typeof selector == 'string' ? this.filter(selector) :\r\n                        (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)\r\n                    this.forEach(function(el){\r\n                        if (excludes.indexOf(el) < 0) nodes.push(el)\r\n                    })\r\n                }\r\n                return $(nodes)\r\n            },\r\n            has: function(selector){\r\n                return this.filter(function(){\r\n                    return isObject(selector) ?\r\n                        $.contains(this, selector) :\r\n                        $(this).find(selector).size()\r\n                })\r\n            },\r\n            eq: function(idx){\r\n                return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)\r\n            },\r\n            first: function(){\r\n                var el = this[0]\r\n                return el && !isObject(el) ? el : $(el)\r\n            },\r\n            last: function(){\r\n                var el = this[this.length - 1]\r\n                return el && !isObject(el) ? el : $(el)\r\n            },\r\n            find: function(selector){\r\n                var result, $this = this\r\n                if (!selector) result = $()\r\n                else if (typeof selector == 'object')\r\n                    result = $(selector).filter(function(){\r\n                        var node = this\r\n                        return emptyArray.some.call($this, function(parent){\r\n                            return $.contains(parent, node)\r\n                        })\r\n                    })\r\n                else if (this.length == 1) result = $(zepto.qsa(this[0], selector))\r\n                else result = this.map(function(){ return zepto.qsa(this, selector) })\r\n                return result\r\n            },\r\n            closest: function(selector, context){\r\n                var nodes = [], collection = typeof selector == 'object' && $(selector)\r\n                this.each(function(_, node){\r\n                    while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))\r\n                        node = node !== context && !isDocument(node) && node.parentNode\r\n                    if (node && nodes.indexOf(node) < 0) nodes.push(node)\r\n                })\r\n                return $(nodes)\r\n            },\r\n            parents: function(selector){\r\n                var ancestors = [], nodes = this\r\n                while (nodes.length > 0)\r\n                    nodes = $.map(nodes, function(node){\r\n                        if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {\r\n                            ancestors.push(node)\r\n                            return node\r\n                        }\r\n                    })\r\n                return filtered(ancestors, selector)\r\n            },\r\n            parent: function(selector){\r\n                return filtered(uniq(this.pluck('parentNode')), selector)\r\n            },\r\n            children: function(selector){\r\n                return filtered(this.map(function(){ return children(this) }), selector)\r\n            },\r\n            contents: function() {\r\n                return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })\r\n            },\r\n            siblings: function(selector){\r\n                return filtered(this.map(function(i, el){\r\n                    return filter.call(children(el.parentNode), function(child){ return child!==el })\r\n                }), selector)\r\n            },\r\n            empty: function(){\r\n                return this.each(function(){ this.innerHTML = '' })\r\n            },\r\n            // `pluck` is borrowed from Prototype.js\r\n            pluck: function(property){\r\n                return $.map(this, function(el){ return el[property] })\r\n            },\r\n            show: function(){\r\n                return this.each(function(){\r\n                    this.style.display == \"none\" && (this.style.display = '')\r\n                    if (getComputedStyle(this, '').getPropertyValue(\"display\") == \"none\")\r\n                        this.style.display = defaultDisplay(this.nodeName)\r\n                })\r\n            },\r\n            replaceWith: function(newContent){\r\n                return this.before(newContent).remove()\r\n            },\r\n            wrap: function(structure){\r\n                var func = isFunction(structure)\r\n                if (this[0] && !func)\r\n                    var dom   = $(structure).get(0),\r\n                        clone = dom.parentNode || this.length > 1\r\n\r\n                return this.each(function(index){\r\n                    $(this).wrapAll(\r\n                        func ? structure.call(this, index) :\r\n                            clone ? dom.cloneNode(true) : dom\r\n                    )\r\n                })\r\n            },\r\n            wrapAll: function(structure){\r\n                if (this[0]) {\r\n                    $(this[0]).before(structure = $(structure))\r\n                    var children\r\n                    // drill down to the inmost element\r\n                    while ((children = structure.children()).length) structure = children.first()\r\n                    $(structure).append(this)\r\n                }\r\n                return this\r\n            },\r\n            wrapInner: function(structure){\r\n                var func = isFunction(structure)\r\n                return this.each(function(index){\r\n                    var self = $(this), contents = self.contents(),\r\n                        dom  = func ? structure.call(this, index) : structure\r\n                    contents.length ? contents.wrapAll(dom) : self.append(dom)\r\n                })\r\n            },\r\n            unwrap: function(){\r\n                this.parent().each(function(){\r\n                    $(this).replaceWith($(this).children())\r\n                })\r\n                return this\r\n            },\r\n            clone: function(){\r\n                return this.map(function(){ return this.cloneNode(true) })\r\n            },\r\n            hide: function(){\r\n                return this.css(\"display\", \"none\")\r\n            },\r\n            toggle: function(setting){\r\n                return this.each(function(){\r\n                    var el = $(this)\r\n                    ;(setting === undefined ? el.css(\"display\") == \"none\" : setting) ? el.show() : el.hide()\r\n                })\r\n            },\r\n            prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },\r\n            next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },\r\n            html: function(html){\r\n                return 0 in arguments ?\r\n                    this.each(function(idx){\r\n                        var originHtml = this.innerHTML\r\n                        $(this).empty().append( funcArg(this, html, idx, originHtml) )\r\n                    }) :\r\n                    (0 in this ? this[0].innerHTML : null)\r\n            },\r\n            text: function(text){\r\n                return 0 in arguments ?\r\n                    this.each(function(idx){\r\n                        var newText = funcArg(this, text, idx, this.textContent)\r\n                        this.textContent = newText == null ? '' : ''+newText\r\n                    }) :\r\n                    (0 in this ? this.pluck('textContent').join(\"\") : null)\r\n            },\r\n            attr: function(name, value){\r\n                var result\r\n                return (typeof name == 'string' && !(1 in arguments)) ?\r\n                    (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :\r\n                    this.each(function(idx){\r\n                        if (this.nodeType !== 1) return\r\n                        if (isObject(name)) for (key in name) setAttribute(this, key, name[key])\r\n                        else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))\r\n                    })\r\n            },\r\n            removeAttr: function(name){\r\n                return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){\r\n                    setAttribute(this, attribute)\r\n                }, this)})\r\n            },\r\n            prop: function(name, value){\r\n                name = propMap[name] || name\r\n                return (1 in arguments) ?\r\n                    this.each(function(idx){\r\n                        this[name] = funcArg(this, value, idx, this[name])\r\n                    }) :\r\n                    (this[0] && this[0][name])\r\n            },\r\n            removeProp: function(name){\r\n                name = propMap[name] || name\r\n                return this.each(function(){ delete this[name] })\r\n            },\r\n            data: function(name, value){\r\n                var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()\r\n\r\n                var data = (1 in arguments) ?\r\n                    this.attr(attrName, value) :\r\n                    this.attr(attrName)\r\n\r\n                return data !== null ? deserializeValue(data) : undefined\r\n            },\r\n            val: function(value){\r\n                if (0 in arguments) {\r\n                    if (value == null) value = \"\"\r\n                    return this.each(function(idx){\r\n                        this.value = funcArg(this, value, idx, this.value)\r\n                    })\r\n                } else {\r\n                    return this[0] && (this[0].multiple ?\r\n                        $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :\r\n                        this[0].value)\r\n                }\r\n            },\r\n            offset: function(coordinates){\r\n                if (coordinates) return this.each(function(index){\r\n                    var $this = $(this),\r\n                        coords = funcArg(this, coordinates, index, $this.offset()),\r\n                        parentOffset = $this.offsetParent().offset(),\r\n                        props = {\r\n                            top:  coords.top  - parentOffset.top,\r\n                            left: coords.left - parentOffset.left\r\n                        }\r\n\r\n                    if ($this.css('position') == 'static') props['position'] = 'relative'\r\n                    $this.css(props)\r\n                })\r\n                if (!this.length) return null\r\n                if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))\r\n                    return {top: 0, left: 0}\r\n                var obj = this[0].getBoundingClientRect()\r\n                return {\r\n                    left: obj.left + window.pageXOffset,\r\n                    top: obj.top + window.pageYOffset,\r\n                    width: Math.round(obj.width),\r\n                    height: Math.round(obj.height)\r\n                }\r\n            },\r\n            css: function(property, value){\r\n                if (arguments.length < 2) {\r\n                    var element = this[0]\r\n                    if (typeof property == 'string') {\r\n                        if (!element) return\r\n                        return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)\r\n                    } else if (isArray(property)) {\r\n                        if (!element) return\r\n                        var props = {}\r\n                        var computedStyle = getComputedStyle(element, '')\r\n                        $.each(property, function(_, prop){\r\n                            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))\r\n                        })\r\n                        return props\r\n                    }\r\n                }\r\n\r\n                var css = ''\r\n                if (type(property) == 'string') {\r\n                    if (!value && value !== 0)\r\n                        this.each(function(){ this.style.removeProperty(dasherize(property)) })\r\n                    else\r\n                        css = dasherize(property) + \":\" + maybeAddPx(property, value)\r\n                } else {\r\n                    for (key in property)\r\n                        if (!property[key] && property[key] !== 0)\r\n                            this.each(function(){ this.style.removeProperty(dasherize(key)) })\r\n                        else\r\n                            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'\r\n                }\r\n\r\n                return this.each(function(){ this.style.cssText += ';' + css })\r\n            },\r\n            index: function(element){\r\n                return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])\r\n            },\r\n            hasClass: function(name){\r\n                if (!name) return false\r\n                return emptyArray.some.call(this, function(el){\r\n                    return this.test(className(el))\r\n                }, classRE(name))\r\n            },\r\n            addClass: function(name){\r\n                if (!name) return this\r\n                return this.each(function(idx){\r\n                    if (!('className' in this)) return\r\n                    classList = []\r\n                    var cls = className(this), newName = funcArg(this, name, idx, cls)\r\n                    newName.split(/\\s+/g).forEach(function(klass){\r\n                        if (!$(this).hasClass(klass)) classList.push(klass)\r\n                    }, this)\r\n                    classList.length && className(this, cls + (cls ? \" \" : \"\") + classList.join(\" \"))\r\n                })\r\n            },\r\n            removeClass: function(name){\r\n                return this.each(function(idx){\r\n                    if (!('className' in this)) return\r\n                    if (name === undefined) return className(this, '')\r\n                    classList = className(this)\r\n                    funcArg(this, name, idx, classList).split(/\\s+/g).forEach(function(klass){\r\n                        classList = classList.replace(classRE(klass), \" \")\r\n                    })\r\n                    className(this, classList.trim())\r\n                })\r\n            },\r\n            toggleClass: function(name, when){\r\n                if (!name) return this\r\n                return this.each(function(idx){\r\n                    var $this = $(this), names = funcArg(this, name, idx, className(this))\r\n                    names.split(/\\s+/g).forEach(function(klass){\r\n                        (when === undefined ? !$this.hasClass(klass) : when) ?\r\n                            $this.addClass(klass) : $this.removeClass(klass)\r\n                    })\r\n                })\r\n            },\r\n            scrollTop: function(value){\r\n                if (!this.length) return\r\n                var hasScrollTop = 'scrollTop' in this[0]\r\n                if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset\r\n                return this.each(hasScrollTop ?\r\n                    function(){ this.scrollTop = value } :\r\n                    function(){ this.scrollTo(this.scrollX, value) })\r\n            },\r\n            scrollLeft: function(value){\r\n                if (!this.length) return\r\n                var hasScrollLeft = 'scrollLeft' in this[0]\r\n                if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset\r\n                return this.each(hasScrollLeft ?\r\n                    function(){ this.scrollLeft = value } :\r\n                    function(){ this.scrollTo(value, this.scrollY) })\r\n            },\r\n            position: function() {\r\n                if (!this.length) return\r\n\r\n                var elem = this[0],\r\n                    // Get *real* offsetParent\r\n                    offsetParent = this.offsetParent(),\r\n                    // Get correct offsets\r\n                    offset       = this.offset(),\r\n                    parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()\r\n\r\n                // Subtract element margins\r\n                // note: when an element has margin: auto the offsetLeft and marginLeft\r\n                // are the same in Safari causing offset.left to incorrectly be 0\r\n                offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0\r\n                offset.left -= parseFloat( $(elem).css('margin-left') ) || 0\r\n\r\n                // Add offsetParent borders\r\n                parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0\r\n                parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0\r\n\r\n                // Subtract the two offsets\r\n                return {\r\n                    top:  offset.top  - parentOffset.top,\r\n                    left: offset.left - parentOffset.left\r\n                }\r\n            },\r\n            offsetParent: function() {\r\n                return this.map(function(){\r\n                    var parent = this.offsetParent || document.body\r\n                    while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css(\"position\") == \"static\")\r\n                        parent = parent.offsetParent\r\n                    return parent\r\n                })\r\n            }\r\n        }\r\n\r\n        // for now\r\n        $.fn.detach = $.fn.remove\r\n\r\n        // Generate the `width` and `height` functions\r\n        ;['width', 'height'].forEach(function(dimension){\r\n            var dimensionProperty =\r\n                dimension.replace(/./, function(m){ return m[0].toUpperCase() })\r\n\r\n            $.fn[dimension] = function(value){\r\n                var offset, el = this[0]\r\n                if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :\r\n                    isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :\r\n                        (offset = this.offset()) && offset[dimension]\r\n                else return this.each(function(idx){\r\n                    el = $(this)\r\n                    el.css(dimension, funcArg(this, value, idx, el[dimension]()))\r\n                })\r\n            }\r\n        })\r\n\r\n        function traverseNode(node, fun) {\r\n            fun(node)\r\n            for (var i = 0, len = node.childNodes.length; i < len; i++)\r\n                traverseNode(node.childNodes[i], fun)\r\n        }\r\n\r\n        // Generate the `after`, `prepend`, `before`, `append`,\r\n        // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.\r\n        adjacencyOperators.forEach(function(operator, operatorIndex) {\r\n            var inside = operatorIndex % 2 //=> prepend, append\r\n\r\n            $.fn[operator] = function(){\r\n                // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings\r\n                var argType, nodes = $.map(arguments, function(arg) {\r\n                        var arr = []\r\n                        argType = type(arg)\r\n                        if (argType == \"array\") {\r\n                            arg.forEach(function(el) {\r\n                                if (el.nodeType !== undefined) return arr.push(el)\r\n                                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())\r\n                                arr = arr.concat(zepto.fragment(el))\r\n                            })\r\n                            return arr\r\n                        }\r\n                        return argType == \"object\" || arg == null ?\r\n                            arg : zepto.fragment(arg)\r\n                    }),\r\n                    parent, copyByClone = this.length > 1\r\n                if (nodes.length < 1) return this\r\n\r\n                return this.each(function(_, target){\r\n                    parent = inside ? target : target.parentNode\r\n\r\n                    // convert all methods to a \"before\" operation\r\n                    target = operatorIndex == 0 ? target.nextSibling :\r\n                        operatorIndex == 1 ? target.firstChild :\r\n                            operatorIndex == 2 ? target :\r\n                                null\r\n\r\n                    var parentInDocument = $.contains(document.documentElement, parent)\r\n\r\n                    nodes.forEach(function(node){\r\n                        if (copyByClone) node = node.cloneNode(true)\r\n                        else if (!parent) return $(node).remove()\r\n\r\n                        parent.insertBefore(node, target)\r\n                        if (parentInDocument) traverseNode(node, function(el){\r\n                            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&\r\n                                (!el.type || el.type === 'text/javascript') && !el.src){\r\n                                var target = el.ownerDocument ? el.ownerDocument.defaultView : window\r\n                                target['eval'].call(target, el.innerHTML)\r\n                            }\r\n                        })\r\n                    })\r\n                })\r\n            }\r\n\r\n            // after    => insertAfter\r\n            // prepend  => prependTo\r\n            // before   => insertBefore\r\n            // append   => appendTo\r\n            $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){\r\n                $(html)[operator](this)\r\n                return this\r\n            }\r\n        })\r\n\r\n        zepto.Z.prototype = Z.prototype = $.fn\r\n\r\n        // Export internal API functions in the `$.zepto` namespace\r\n        zepto.uniq = uniq\r\n        zepto.deserializeValue = deserializeValue\r\n        $.zepto = zepto\r\n\r\n        return $\r\n    })()\r\n\r\n    window.Zepto = Zepto\r\n    window.$ === undefined && (window.$ = Zepto)\r\n    module.exports = Zepto\r\n\r\n    ;(function($){\r\n        var _zid = 1, undefined,\r\n            slice = Array.prototype.slice,\r\n            isFunction = $.isFunction,\r\n            isString = function(obj){ return typeof obj == 'string' },\r\n            handlers = {},\r\n            specialEvents={},\r\n            focusinSupported = 'onfocusin' in window,\r\n            focus = { focus: 'focusin', blur: 'focusout' },\r\n            hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }\r\n\r\n        specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'\r\n\r\n        function zid(element) {\r\n            return element._zid || (element._zid = _zid++)\r\n        }\r\n        function findHandlers(element, event, fn, selector) {\r\n            event = parse(event)\r\n            if (event.ns) var matcher = matcherFor(event.ns)\r\n            return (handlers[zid(element)] || []).filter(function(handler) {\r\n                return handler\r\n                    && (!event.e  || handler.e == event.e)\r\n                    && (!event.ns || matcher.test(handler.ns))\r\n                    && (!fn       || zid(handler.fn) === zid(fn))\r\n                    && (!selector || handler.sel == selector)\r\n            })\r\n        }\r\n        function parse(event) {\r\n            var parts = ('' + event).split('.')\r\n            return {e: parts[0], ns: parts.slice(1).sort().join(' ')}\r\n        }\r\n        function matcherFor(ns) {\r\n            return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')\r\n        }\r\n\r\n        function eventCapture(handler, captureSetting) {\r\n            return handler.del &&\r\n                (!focusinSupported && (handler.e in focus)) ||\r\n                !!captureSetting\r\n        }\r\n\r\n        function realEvent(type) {\r\n            return hover[type] || (focusinSupported && focus[type]) || type\r\n        }\r\n\r\n        function add(element, events, fn, data, selector, delegator, capture){\r\n            var id = zid(element), set = (handlers[id] || (handlers[id] = []))\r\n            events.split(/\\s/).forEach(function(event){\r\n                if (event == 'ready') return $(document).ready(fn)\r\n                var handler   = parse(event)\r\n                handler.fn    = fn\r\n                handler.sel   = selector\r\n                // emulate mouseenter, mouseleave\r\n                if (handler.e in hover) fn = function(e){\r\n                    var related = e.relatedTarget\r\n                    if (!related || (related !== this && !$.contains(this, related)))\r\n                        return handler.fn.apply(this, arguments)\r\n                }\r\n                handler.del   = delegator\r\n                var callback  = delegator || fn\r\n                handler.proxy = function(e){\r\n                    e = compatible(e)\r\n                    if (e.isImmediatePropagationStopped()) return\r\n                    e.data = data\r\n                    var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))\r\n                    if (result === false) e.preventDefault(), e.stopPropagation()\r\n                    return result\r\n                }\r\n                handler.i = set.length\r\n                set.push(handler)\r\n                if ('addEventListener' in element)\r\n                    element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))\r\n            })\r\n        }\r\n        function remove(element, events, fn, selector, capture){\r\n            var id = zid(element)\r\n            ;(events || '').split(/\\s/).forEach(function(event){\r\n                findHandlers(element, event, fn, selector).forEach(function(handler){\r\n                    delete handlers[id][handler.i]\r\n                    if ('removeEventListener' in element)\r\n                        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))\r\n                })\r\n            })\r\n        }\r\n\r\n        $.event = { add: add, remove: remove }\r\n\r\n        $.proxy = function(fn, context) {\r\n            var args = (2 in arguments) && slice.call(arguments, 2)\r\n            if (isFunction(fn)) {\r\n                var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }\r\n                proxyFn._zid = zid(fn)\r\n                return proxyFn\r\n            } else if (isString(context)) {\r\n                if (args) {\r\n                    args.unshift(fn[context], fn)\r\n                    return $.proxy.apply(null, args)\r\n                } else {\r\n                    return $.proxy(fn[context], fn)\r\n                }\r\n            } else {\r\n                throw new TypeError(\"expected function\")\r\n            }\r\n        }\r\n\r\n        $.fn.bind = function(event, data, callback){\r\n            return this.on(event, data, callback)\r\n        }\r\n        $.fn.unbind = function(event, callback){\r\n            return this.off(event, callback)\r\n        }\r\n        $.fn.one = function(event, selector, data, callback){\r\n            return this.on(event, selector, data, callback, 1)\r\n        }\r\n\r\n        var returnTrue = function(){return true},\r\n            returnFalse = function(){return false},\r\n            ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,\r\n            eventMethods = {\r\n                preventDefault: 'isDefaultPrevented',\r\n                stopImmediatePropagation: 'isImmediatePropagationStopped',\r\n                stopPropagation: 'isPropagationStopped'\r\n            }\r\n\r\n        function compatible(event, source) {\r\n            if (source || !event.isDefaultPrevented) {\r\n                source || (source = event)\r\n\r\n                $.each(eventMethods, function(name, predicate) {\r\n                    var sourceMethod = source[name]\r\n                    event[name] = function(){\r\n                        this[predicate] = returnTrue\r\n                        return sourceMethod && sourceMethod.apply(source, arguments)\r\n                    }\r\n                    event[predicate] = returnFalse\r\n                })\r\n\r\n                event.timeStamp || (event.timeStamp = Date.now())\r\n\r\n                if (source.defaultPrevented !== undefined ? source.defaultPrevented :\r\n                    'returnValue' in source ? source.returnValue === false :\r\n                        source.getPreventDefault && source.getPreventDefault())\r\n                    event.isDefaultPrevented = returnTrue\r\n            }\r\n            return event\r\n        }\r\n\r\n        function createProxy(event) {\r\n            var key, proxy = { originalEvent: event }\r\n            for (key in event)\r\n                if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]\r\n\r\n            return compatible(proxy, event)\r\n        }\r\n\r\n        $.fn.delegate = function(selector, event, callback){\r\n            return this.on(event, selector, callback)\r\n        }\r\n        $.fn.undelegate = function(selector, event, callback){\r\n            return this.off(event, selector, callback)\r\n        }\r\n\r\n        $.fn.live = function(event, callback){\r\n            $(document.body).delegate(this.selector, event, callback)\r\n            return this\r\n        }\r\n        $.fn.die = function(event, callback){\r\n            $(document.body).undelegate(this.selector, event, callback)\r\n            return this\r\n        }\r\n\r\n        $.fn.on = function(event, selector, data, callback, one){\r\n            var autoRemove, delegator, $this = this\r\n            if (event && !isString(event)) {\r\n                $.each(event, function(type, fn){\r\n                    $this.on(type, selector, data, fn, one)\r\n                })\r\n                return $this\r\n            }\r\n\r\n            if (!isString(selector) && !isFunction(callback) && callback !== false)\r\n                callback = data, data = selector, selector = undefined\r\n            if (callback === undefined || data === false)\r\n                callback = data, data = undefined\r\n\r\n            if (callback === false) callback = returnFalse\r\n\r\n            return $this.each(function(_, element){\r\n                if (one) autoRemove = function(e){\r\n                    remove(element, e.type, callback)\r\n                    return callback.apply(this, arguments)\r\n                }\r\n\r\n                if (selector) delegator = function(e){\r\n                    var evt, match = $(e.target).closest(selector, element).get(0)\r\n                    if (match && match !== element) {\r\n                        evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})\r\n                        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))\r\n                    }\r\n                }\r\n\r\n                add(element, event, callback, data, selector, delegator || autoRemove)\r\n            })\r\n        }\r\n        $.fn.off = function(event, selector, callback){\r\n            var $this = this\r\n            if (event && !isString(event)) {\r\n                $.each(event, function(type, fn){\r\n                    $this.off(type, selector, fn)\r\n                })\r\n                return $this\r\n            }\r\n\r\n            if (!isString(selector) && !isFunction(callback) && callback !== false)\r\n                callback = selector, selector = undefined\r\n\r\n            if (callback === false) callback = returnFalse\r\n\r\n            return $this.each(function(){\r\n                remove(this, event, callback, selector)\r\n            })\r\n        }\r\n\r\n        $.fn.trigger = function(event, args){\r\n            event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)\r\n            event._args = args\r\n            return this.each(function(){\r\n                // handle focus(), blur() by calling them directly\r\n                if (event.type in focus && typeof this[event.type] == \"function\") this[event.type]()\r\n                // items in the collection might not be DOM elements\r\n                else if ('dispatchEvent' in this) this.dispatchEvent(event)\r\n                else $(this).triggerHandler(event, args)\r\n            })\r\n        }\r\n\r\n        // triggers event handlers on current element just as if an event occurred,\r\n        // doesn't trigger an actual event, doesn't bubble\r\n        $.fn.triggerHandler = function(event, args){\r\n            var e, result\r\n            this.each(function(i, element){\r\n                e = createProxy(isString(event) ? $.Event(event) : event)\r\n                e._args = args\r\n                e.target = element\r\n                $.each(findHandlers(element, event.type || event), function(i, handler){\r\n                    result = handler.proxy(e)\r\n                    if (e.isImmediatePropagationStopped()) return false\r\n                })\r\n            })\r\n            return result\r\n        }\r\n\r\n        // shortcut methods for `.bind(event, fn)` for each event type\r\n        ;('focusin focusout focus blur load resize scroll unload click dblclick '+\r\n            'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+\r\n            'change select keydown keypress keyup error').split(' ').forEach(function(event) {\r\n            $.fn[event] = function(callback) {\r\n                return (0 in arguments) ?\r\n                    this.bind(event, callback) :\r\n                    this.trigger(event)\r\n            }\r\n        })\r\n\r\n        $.Event = function(type, props) {\r\n            if (!isString(type)) props = type, type = props.type\r\n            var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true\r\n            if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])\r\n            event.initEvent(type, bubbles, true)\r\n            return compatible(event)\r\n        }\r\n\r\n    })(Zepto)\r\n\r\n    ;(function($){\r\n        var jsonpID = +new Date(),\r\n            document = window.document,\r\n            key,\r\n            name,\r\n            rscript = /<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi,\r\n            scriptTypeRE = /^(?:text|application)\\/javascript/i,\r\n            xmlTypeRE = /^(?:text|application)\\/xml/i,\r\n            jsonType = 'application/json',\r\n            htmlType = 'text/html',\r\n            blankRE = /^\\s*$/,\r\n            originAnchor = document.createElement('a')\r\n\r\n        originAnchor.href = window.location.href\r\n\r\n        // trigger a custom event and return false if it was cancelled\r\n        function triggerAndReturn(context, eventName, data) {\r\n            var event = $.Event(eventName)\r\n            $(context).trigger(event, data)\r\n            return !event.isDefaultPrevented()\r\n        }\r\n\r\n        // trigger an Ajax \"global\" event\r\n        function triggerGlobal(settings, context, eventName, data) {\r\n            if (settings.global) return triggerAndReturn(context || document, eventName, data)\r\n        }\r\n\r\n        // Number of active Ajax requests\r\n        $.active = 0\r\n\r\n        function ajaxStart(settings) {\r\n            if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')\r\n        }\r\n        function ajaxStop(settings) {\r\n            if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')\r\n        }\r\n\r\n        // triggers an extra global event \"ajaxBeforeSend\" that's like \"ajaxSend\" but cancelable\r\n        function ajaxBeforeSend(xhr, settings) {\r\n            var context = settings.context\r\n            if (settings.beforeSend.call(context, xhr, settings) === false ||\r\n                triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)\r\n                return false\r\n\r\n            triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])\r\n        }\r\n        function ajaxSuccess(data, xhr, settings, deferred) {\r\n            var context = settings.context, status = 'success'\r\n            settings.success.call(context, data, status, xhr)\r\n            if (deferred) deferred.resolveWith(context, [data, status, xhr])\r\n            triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])\r\n            ajaxComplete(status, xhr, settings)\r\n        }\r\n        // type: \"timeout\", \"error\", \"abort\", \"parsererror\"\r\n        function ajaxError(error, type, xhr, settings, deferred) {\r\n            var context = settings.context\r\n            settings.error.call(context, xhr, type, error)\r\n            if (deferred) deferred.rejectWith(context, [xhr, type, error])\r\n            triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])\r\n            ajaxComplete(type, xhr, settings)\r\n        }\r\n        // status: \"success\", \"notmodified\", \"error\", \"timeout\", \"abort\", \"parsererror\"\r\n        function ajaxComplete(status, xhr, settings) {\r\n            var context = settings.context\r\n            settings.complete.call(context, xhr, status)\r\n            triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])\r\n            ajaxStop(settings)\r\n        }\r\n\r\n        function ajaxDataFilter(data, type, settings) {\r\n            if (settings.dataFilter == empty) return data\r\n            var context = settings.context\r\n            return settings.dataFilter.call(context, data, type)\r\n        }\r\n\r\n        // Empty function, used as default callback\r\n        function empty() {}\r\n\r\n        $.ajaxJSONP = function(options, deferred){\r\n            if (!('type' in options)) return $.ajax(options)\r\n\r\n            var _callbackName = options.jsonpCallback,\r\n                callbackName = ($.isFunction(_callbackName) ?\r\n                    _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),\r\n                script = document.createElement('script'),\r\n                originalCallback = window[callbackName],\r\n                responseData,\r\n                abort = function(errorType) {\r\n                    $(script).triggerHandler('error', errorType || 'abort')\r\n                },\r\n                xhr = { abort: abort }, abortTimeout\r\n\r\n            if (deferred) deferred.promise(xhr)\r\n\r\n            $(script).on('load error', function(e, errorType){\r\n                clearTimeout(abortTimeout)\r\n                $(script).off().remove()\r\n\r\n                if (e.type == 'error' || !responseData) {\r\n                    ajaxError(null, errorType || 'error', xhr, options, deferred)\r\n                } else {\r\n                    ajaxSuccess(responseData[0], xhr, options, deferred)\r\n                }\r\n\r\n                window[callbackName] = originalCallback\r\n                if (responseData && $.isFunction(originalCallback))\r\n                    originalCallback(responseData[0])\r\n\r\n                originalCallback = responseData = undefined\r\n            })\r\n\r\n            if (ajaxBeforeSend(xhr, options) === false) {\r\n                abort('abort')\r\n                return xhr\r\n            }\r\n\r\n            window[callbackName] = function(){\r\n                responseData = arguments\r\n            }\r\n\r\n            script.src = options.url.replace(/\\?(.+)=\\?/, '?$1=' + callbackName)\r\n            document.head.appendChild(script)\r\n\r\n            if (options.timeout > 0) abortTimeout = setTimeout(function(){\r\n                abort('timeout')\r\n            }, options.timeout)\r\n\r\n            return xhr\r\n        }\r\n\r\n        $.ajaxSettings = {\r\n            // Default type of request\r\n            type: 'GET',\r\n            // Callback that is executed before request\r\n            beforeSend: empty,\r\n            // Callback that is executed if the request succeeds\r\n            success: empty,\r\n            // Callback that is executed the the server drops error\r\n            error: empty,\r\n            // Callback that is executed on request complete (both: error and success)\r\n            complete: empty,\r\n            // The context for the callbacks\r\n            context: null,\r\n            // Whether to trigger \"global\" Ajax events\r\n            global: true,\r\n            // Transport\r\n            xhr: function () {\r\n                return new window.XMLHttpRequest()\r\n            },\r\n            // MIME types mapping\r\n            // IIS returns Javascript as \"application/x-javascript\"\r\n            accepts: {\r\n                script: 'text/javascript, application/javascript, application/x-javascript',\r\n                json:   jsonType,\r\n                xml:    'application/xml, text/xml',\r\n                html:   htmlType,\r\n                text:   'text/plain'\r\n            },\r\n            // Whether the request is to another domain\r\n            crossDomain: false,\r\n            // Default timeout\r\n            timeout: 0,\r\n            // Whether data should be serialized to string\r\n            processData: true,\r\n            // Whether the browser should be allowed to cache GET responses\r\n            cache: true,\r\n            //Used to handle the raw response data of XMLHttpRequest.\r\n            //This is a pre-filtering function to sanitize the response.\r\n            //The sanitized response should be returned\r\n            dataFilter: empty\r\n        }\r\n\r\n        function mimeToDataType(mime) {\r\n            if (mime) mime = mime.split(';', 2)[0]\r\n            return mime && ( mime == htmlType ? 'html' :\r\n                mime == jsonType ? 'json' :\r\n                    scriptTypeRE.test(mime) ? 'script' :\r\n                        xmlTypeRE.test(mime) && 'xml' ) || 'text'\r\n        }\r\n\r\n        function appendQuery(url, query) {\r\n            if (query == '') return url\r\n            return (url + '&' + query).replace(/[&?]{1,2}/, '?')\r\n        }\r\n\r\n        // serialize payload and append it to the URL for GET requests\r\n        function serializeData(options) {\r\n            if (options.processData && options.data && $.type(options.data) != \"string\")\r\n                options.data = $.param(options.data, options.traditional)\r\n            if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))\r\n                options.url = appendQuery(options.url, options.data), options.data = undefined\r\n        }\r\n\r\n        $.ajax = function(options){\r\n            var settings = $.extend({}, options || {}),\r\n                deferred = $.Deferred && $.Deferred(),\r\n                urlAnchor, hashIndex\r\n            for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]\r\n\r\n            ajaxStart(settings)\r\n\r\n            if (!settings.crossDomain) {\r\n                urlAnchor = document.createElement('a')\r\n                urlAnchor.href = settings.url\r\n                // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049\r\n                urlAnchor.href = urlAnchor.href\r\n                settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)\r\n            }\r\n\r\n            if (!settings.url) settings.url = window.location.toString()\r\n            if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)\r\n            serializeData(settings)\r\n\r\n            var dataType = settings.dataType, hasPlaceholder = /\\?.+=\\?/.test(settings.url)\r\n            if (hasPlaceholder) dataType = 'jsonp'\r\n\r\n            if (settings.cache === false || (\r\n                (!options || options.cache !== true) &&\r\n                ('script' == dataType || 'jsonp' == dataType)\r\n            ))\r\n                settings.url = appendQuery(settings.url, '_=' + Date.now())\r\n\r\n            if ('jsonp' == dataType) {\r\n                if (!hasPlaceholder)\r\n                    settings.url = appendQuery(settings.url,\r\n                        settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')\r\n                return $.ajaxJSONP(settings, deferred)\r\n            }\r\n\r\n            var mime = settings.accepts[dataType],\r\n                headers = { },\r\n                setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },\r\n                protocol = /^([\\w-]+:)\\/\\//.test(settings.url) ? RegExp.$1 : window.location.protocol,\r\n                xhr = settings.xhr(),\r\n                nativeSetHeader = xhr.setRequestHeader,\r\n                abortTimeout\r\n\r\n            if (deferred) deferred.promise(xhr)\r\n\r\n            if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')\r\n            setHeader('Accept', mime || '*/*')\r\n            if (mime = settings.mimeType || mime) {\r\n                if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]\r\n                xhr.overrideMimeType && xhr.overrideMimeType(mime)\r\n            }\r\n            if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))\r\n                setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')\r\n\r\n            if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])\r\n            xhr.setRequestHeader = setHeader\r\n\r\n            xhr.onreadystatechange = function(){\r\n                if (xhr.readyState == 4) {\r\n                    xhr.onreadystatechange = empty\r\n                    clearTimeout(abortTimeout)\r\n                    var result, error = false\r\n                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {\r\n                        dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))\r\n\r\n                        if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')\r\n                            result = xhr.response\r\n                        else {\r\n                            result = xhr.responseText\r\n\r\n                            try {\r\n                                // http://perfectionkills.com/global-eval-what-are-the-options/\r\n                                // sanitize response accordingly if data filter callback provided\r\n                                result = ajaxDataFilter(result, dataType, settings)\r\n                                if (dataType == 'script')    (1,eval)(result)\r\n                                else if (dataType == 'xml')  result = xhr.responseXML\r\n                                else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)\r\n                            } catch (e) { error = e }\r\n\r\n                            if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)\r\n                        }\r\n\r\n                        ajaxSuccess(result, xhr, settings, deferred)\r\n                    } else {\r\n                        ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)\r\n                    }\r\n                }\r\n            }\r\n\r\n            if (ajaxBeforeSend(xhr, settings) === false) {\r\n                xhr.abort()\r\n                ajaxError(null, 'abort', xhr, settings, deferred)\r\n                return xhr\r\n            }\r\n\r\n            var async = 'async' in settings ? settings.async : true\r\n            xhr.open(settings.type, settings.url, async, settings.username, settings.password)\r\n\r\n            if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]\r\n\r\n            for (name in headers) nativeSetHeader.apply(xhr, headers[name])\r\n\r\n            if (settings.timeout > 0) abortTimeout = setTimeout(function(){\r\n                xhr.onreadystatechange = empty\r\n                xhr.abort()\r\n                ajaxError(null, 'timeout', xhr, settings, deferred)\r\n            }, settings.timeout)\r\n\r\n            // avoid sending empty string (#319)\r\n            xhr.send(settings.data ? settings.data : null)\r\n            return xhr\r\n        }\r\n\r\n        // handle optional data/success arguments\r\n        function parseArguments(url, data, success, dataType) {\r\n            if ($.isFunction(data)) dataType = success, success = data, data = undefined\r\n            if (!$.isFunction(success)) dataType = success, success = undefined\r\n            return {\r\n                url: url\r\n                , data: data\r\n                , success: success\r\n                , dataType: dataType\r\n            }\r\n        }\r\n\r\n        $.get = function(/* url, data, success, dataType */){\r\n            return $.ajax(parseArguments.apply(null, arguments))\r\n        }\r\n\r\n        $.post = function(/* url, data, success, dataType */){\r\n            var options = parseArguments.apply(null, arguments)\r\n            options.type = 'POST'\r\n            return $.ajax(options)\r\n        }\r\n\r\n        $.getJSON = function(/* url, data, success */){\r\n            var options = parseArguments.apply(null, arguments)\r\n            options.dataType = 'json'\r\n            return $.ajax(options)\r\n        }\r\n\r\n        $.fn.load = function(url, data, success){\r\n            if (!this.length) return this\r\n            var self = this, parts = url.split(/\\s/), selector,\r\n                options = parseArguments(url, data, success),\r\n                callback = options.success\r\n            if (parts.length > 1) options.url = parts[0], selector = parts[1]\r\n            options.success = function(response){\r\n                self.html(selector ?\r\n                    $('<div>').html(response.replace(rscript, \"\")).find(selector)\r\n                    : response)\r\n                callback && callback.apply(self, arguments)\r\n            }\r\n            $.ajax(options)\r\n            return this\r\n        }\r\n\r\n        var escape = encodeURIComponent\r\n\r\n        function serialize(params, obj, traditional, scope){\r\n            var type, array = $.isArray(obj), hash = $.isPlainObject(obj)\r\n            $.each(obj, function(key, value) {\r\n                type = $.type(value)\r\n                if (scope) key = traditional ? scope :\r\n                    scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'\r\n                // handle data in serializeArray() format\r\n                if (!scope && array) params.add(value.name, value.value)\r\n                // recurse into nested objects\r\n                else if (type == \"array\" || (!traditional && type == \"object\"))\r\n                    serialize(params, value, traditional, key)\r\n                else params.add(key, value)\r\n            })\r\n        }\r\n\r\n        $.param = function(obj, traditional){\r\n            var params = []\r\n            params.add = function(key, value) {\r\n                if ($.isFunction(value)) value = value()\r\n                if (value == null) value = \"\"\r\n                this.push(escape(key) + '=' + escape(value))\r\n            }\r\n            serialize(params, obj, traditional)\r\n            return params.join('&').replace(/%20/g, '+')\r\n        }\r\n    })(Zepto)\r\n\r\n    ;(function($){\r\n        $.fn.serializeArray = function() {\r\n            var name, type, result = [],\r\n                add = function(value) {\r\n                    if (value.forEach) return value.forEach(add)\r\n                    result.push({ name: name, value: value })\r\n                }\r\n            if (this[0]) $.each(this[0].elements, function(_, field){\r\n                type = field.type, name = field.name\r\n                if (name && field.nodeName.toLowerCase() != 'fieldset' &&\r\n                    !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&\r\n                    ((type != 'radio' && type != 'checkbox') || field.checked))\r\n                    add($(field).val())\r\n            })\r\n            return result\r\n        }\r\n\r\n        $.fn.serialize = function(){\r\n            var result = []\r\n            this.serializeArray().forEach(function(elm){\r\n                result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))\r\n            })\r\n            return result.join('&')\r\n        }\r\n\r\n        $.fn.submit = function(callback) {\r\n            if (0 in arguments) this.bind('submit', callback)\r\n            else if (this.length) {\r\n                var event = $.Event('submit')\r\n                this.eq(0).trigger(event)\r\n                if (!event.isDefaultPrevented()) this.get(0).submit()\r\n            }\r\n            return this\r\n        }\r\n\r\n    })(Zepto)\r\n\r\n    ;(function(){\r\n        // getComputedStyle shouldn't freak out when called\r\n        // without a valid element as argument\r\n        try {\r\n            getComputedStyle(undefined)\r\n        } catch(e) {\r\n            var nativeGetComputedStyle = getComputedStyle\r\n            window.getComputedStyle = function(element, pseudoElement){\r\n                try {\r\n                    return nativeGetComputedStyle(element, pseudoElement)\r\n                } catch(e) {\r\n                    return null\r\n                }\r\n            }\r\n        }\r\n    })()\r\n\r\n    ;(function($){\r\n        var touch = {},\r\n            touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,\r\n            longTapDelay = 750,\r\n            gesture,\r\n            down, up, move,\r\n            eventMap,\r\n            initialized = false\r\n\r\n        function swipeDirection(x1, x2, y1, y2) {\r\n            return Math.abs(x1 - x2) >=\r\n            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')\r\n        }\r\n\r\n        function longTap() {\r\n            longTapTimeout = null\r\n            if (touch.last) {\r\n                touch.el.trigger('longTap')\r\n                touch = {}\r\n            }\r\n        }\r\n\r\n        function cancelLongTap() {\r\n            if (longTapTimeout) clearTimeout(longTapTimeout)\r\n            longTapTimeout = null\r\n        }\r\n\r\n        function cancelAll() {\r\n            if (touchTimeout) clearTimeout(touchTimeout)\r\n            if (tapTimeout) clearTimeout(tapTimeout)\r\n            if (swipeTimeout) clearTimeout(swipeTimeout)\r\n            if (longTapTimeout) clearTimeout(longTapTimeout)\r\n            touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null\r\n            touch = {}\r\n        }\r\n\r\n        function isPrimaryTouch(event){\r\n            return (event.pointerType == 'touch' ||\r\n                event.pointerType == event.MSPOINTER_TYPE_TOUCH)\r\n                && event.isPrimary\r\n        }\r\n\r\n        function isPointerEventType(e, type){\r\n            return (e.type == 'pointer'+type ||\r\n                e.type.toLowerCase() == 'mspointer'+type)\r\n        }\r\n\r\n        // helper function for tests, so they check for different APIs\r\n        function unregisterTouchEvents(){\r\n            if (!initialized) return\r\n            $(document).off(eventMap.down, down)\r\n                .off(eventMap.up, up)\r\n                .off(eventMap.move, move)\r\n                .off(eventMap.cancel, cancelAll)\r\n            $(window).off('scroll', cancelAll)\r\n            cancelAll()\r\n            initialized = false\r\n        }\r\n\r\n        function setup(__eventMap){\r\n            var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType\r\n\r\n            unregisterTouchEvents()\r\n\r\n            eventMap = (__eventMap && ('down' in __eventMap)) ? __eventMap :\r\n                ('ontouchstart' in document ?\r\n                    { 'down': 'touchstart', 'up': 'touchend',\r\n                        'move': 'touchmove', 'cancel': 'touchcancel' } :\r\n                    'onpointerdown' in document ?\r\n                        { 'down': 'pointerdown', 'up': 'pointerup',\r\n                            'move': 'pointermove', 'cancel': 'pointercancel' } :\r\n                        'onmspointerdown' in document ?\r\n                            { 'down': 'MSPointerDown', 'up': 'MSPointerUp',\r\n                                'move': 'MSPointerMove', 'cancel': 'MSPointerCancel' } : false)\r\n\r\n            // No API availables for touch events\r\n            if (!eventMap) return\r\n\r\n            if ('MSGesture' in window) {\r\n                gesture = new MSGesture()\r\n                gesture.target = document.body\r\n\r\n                $(document)\r\n                    .bind('MSGestureEnd', function(e){\r\n                        var swipeDirectionFromVelocity =\r\n                            e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null\r\n                        if (swipeDirectionFromVelocity) {\r\n                            touch.el.trigger('swipe')\r\n                            touch.el.trigger('swipe'+ swipeDirectionFromVelocity)\r\n                        }\r\n                    })\r\n            }\r\n\r\n            down = function(e){\r\n                if((_isPointerType = isPointerEventType(e, 'down')) &&\r\n                    !isPrimaryTouch(e)) return\r\n                firstTouch = _isPointerType ? e : e.touches[0]\r\n                if (e.touches && e.touches.length === 1 && touch.x2) {\r\n                    // Clear out touch movement data if we have it sticking around\r\n                    // This can occur if touchcancel doesn't fire due to preventDefault, etc.\r\n                    touch.x2 = undefined\r\n                    touch.y2 = undefined\r\n                }\r\n                now = Date.now()\r\n                delta = now - (touch.last || now)\r\n                touch.el = $('tagName' in firstTouch.target ?\r\n                    firstTouch.target : firstTouch.target.parentNode)\r\n                touchTimeout && clearTimeout(touchTimeout)\r\n                touch.x1 = firstTouch.pageX\r\n                touch.y1 = firstTouch.pageY\r\n                if (delta > 0 && delta <= 250) touch.isDoubleTap = true\r\n                touch.last = now\r\n                longTapTimeout = setTimeout(longTap, longTapDelay)\r\n                // adds the current touch contact for IE gesture recognition\r\n                if (gesture && _isPointerType) gesture.addPointer(e.pointerId)\r\n            }\r\n\r\n            move = function(e){\r\n                if((_isPointerType = isPointerEventType(e, 'move')) &&\r\n                    !isPrimaryTouch(e)) return\r\n                firstTouch = _isPointerType ? e : e.touches[0]\r\n                cancelLongTap()\r\n                touch.x2 = firstTouch.pageX\r\n                touch.y2 = firstTouch.pageY\r\n\r\n                deltaX += Math.abs(touch.x1 - touch.x2)\r\n                deltaY += Math.abs(touch.y1 - touch.y2)\r\n            }\r\n\r\n            up = function(e){\r\n                if((_isPointerType = isPointerEventType(e, 'up')) &&\r\n                    !isPrimaryTouch(e)) return\r\n                cancelLongTap()\r\n\r\n                // swipe\r\n                if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||\r\n                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))\r\n\r\n                    swipeTimeout = setTimeout(function() {\r\n                        if (touch.el){\r\n                            touch.el.trigger('swipe')\r\n                            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))\r\n                        }\r\n                        touch = {}\r\n                    }, 0)\r\n\r\n                // normal tap\r\n                else if ('last' in touch)\r\n                // don't fire tap when delta position changed by more than 30 pixels,\r\n                // for instance when moving to a point and back to origin\r\n                    if (deltaX < 30 && deltaY < 30) {\r\n                        // delay by one tick so we can cancel the 'tap' event if 'scroll' fires\r\n                        // ('tap' fires before 'scroll')\r\n                        tapTimeout = setTimeout(function() {\r\n\r\n                            // trigger universal 'tap' with the option to cancelTouch()\r\n                            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)\r\n                            var event = $.Event('tap')\r\n                            event.cancelTouch = cancelAll\r\n                            // [by paper] fix -> \"TypeError: 'undefined' is not an object (evaluating 'touch.el.trigger'), when double tap\r\n                            if (touch.el) touch.el.trigger(event)\r\n\r\n                            // trigger double tap immediately\r\n                            if (touch.isDoubleTap) {\r\n                                if (touch.el) touch.el.trigger('doubleTap')\r\n                                touch = {}\r\n                            }\r\n\r\n                            // trigger single tap after 250ms of inactivity\r\n                            else {\r\n                                touchTimeout = setTimeout(function(){\r\n                                    touchTimeout = null\r\n                                    if (touch.el) touch.el.trigger('singleTap')\r\n                                    touch = {}\r\n                                }, 250)\r\n                            }\r\n                        }, 0)\r\n                    } else {\r\n                        touch = {}\r\n                    }\r\n                deltaX = deltaY = 0\r\n            }\r\n\r\n            $(document).on(eventMap.up, up)\r\n                .on(eventMap.down, down)\r\n                .on(eventMap.move, move)\r\n\r\n            // when the browser window loses focus,\r\n            // for example when a modal dialog is shown,\r\n            // cancel all ongoing events\r\n            $(document).on(eventMap.cancel, cancelAll)\r\n\r\n            // scrolling the window indicates intention of the user\r\n            // to scroll, not tap or swipe, so cancel all ongoing events\r\n            $(window).on('scroll', cancelAll)\r\n\r\n            initialized = true\r\n        }\r\n\r\n        ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',\r\n            'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){\r\n            $.fn[eventName] = function(callback){ return this.on(eventName, callback) }\r\n        })\r\n\r\n        $.touch = { setup: setup }\r\n\r\n        $(document).ready(setup)\r\n    })(Zepto)\r\n\r\n    ;(function($){\r\n        // Create a collection of callbacks to be fired in a sequence, with configurable behaviour\r\n        // Option flags:\r\n        //   - once: Callbacks fired at most one time.\r\n        //   - memory: Remember the most recent context and arguments\r\n        //   - stopOnFalse: Cease iterating over callback list\r\n        //   - unique: Permit adding at most one instance of the same callback\r\n        $.Callbacks = function(options) {\r\n            options = $.extend({}, options)\r\n\r\n            var memory, // Last fire value (for non-forgettable lists)\r\n                fired,  // Flag to know if list was already fired\r\n                firing, // Flag to know if list is currently firing\r\n                firingStart, // First callback to fire (used internally by add and fireWith)\r\n                firingLength, // End of the loop when firing\r\n                firingIndex, // Index of currently firing callback (modified by remove if needed)\r\n                list = [], // Actual callback list\r\n                stack = !options.once && [], // Stack of fire calls for repeatable lists\r\n                fire = function(data) {\r\n                    memory = options.memory && data\r\n                    fired = true\r\n                    firingIndex = firingStart || 0\r\n                    firingStart = 0\r\n                    firingLength = list.length\r\n                    firing = true\r\n                    for ( ; list && firingIndex < firingLength ; ++firingIndex ) {\r\n                        if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {\r\n                            memory = false\r\n                            break\r\n                        }\r\n                    }\r\n                    firing = false\r\n                    if (list) {\r\n                        if (stack) stack.length && fire(stack.shift())\r\n                        else if (memory) list.length = 0\r\n                        else Callbacks.disable()\r\n                    }\r\n                },\r\n\r\n                Callbacks = {\r\n                    add: function() {\r\n                        if (list) {\r\n                            var start = list.length,\r\n                                add = function(args) {\r\n                                    $.each(args, function(_, arg){\r\n                                        if (typeof arg === \"function\") {\r\n                                            if (!options.unique || !Callbacks.has(arg)) list.push(arg)\r\n                                        }\r\n                                        else if (arg && arg.length && typeof arg !== 'string') add(arg)\r\n                                    })\r\n                                }\r\n                            add(arguments)\r\n                            if (firing) firingLength = list.length\r\n                            else if (memory) {\r\n                                firingStart = start\r\n                                fire(memory)\r\n                            }\r\n                        }\r\n                        return this\r\n                    },\r\n                    remove: function() {\r\n                        if (list) {\r\n                            $.each(arguments, function(_, arg){\r\n                                var index\r\n                                while ((index = $.inArray(arg, list, index)) > -1) {\r\n                                    list.splice(index, 1)\r\n                                    // Handle firing indexes\r\n                                    if (firing) {\r\n                                        if (index <= firingLength) --firingLength\r\n                                        if (index <= firingIndex) --firingIndex\r\n                                    }\r\n                                }\r\n                            })\r\n                        }\r\n                        return this\r\n                    },\r\n                    has: function(fn) {\r\n                        return !!(list && (fn ? $.inArray(fn, list) > -1 : list.length))\r\n                    },\r\n                    empty: function() {\r\n                        firingLength = list.length = 0\r\n                        return this\r\n                    },\r\n                    disable: function() {\r\n                        list = stack = memory = undefined\r\n                        return this\r\n                    },\r\n                    disabled: function() {\r\n                        return !list\r\n                    },\r\n                    lock: function() {\r\n                        stack = undefined\r\n                        if (!memory) Callbacks.disable()\r\n                        return this\r\n                    },\r\n                    locked: function() {\r\n                        return !stack\r\n                    },\r\n                    fireWith: function(context, args) {\r\n                        if (list && (!fired || stack)) {\r\n                            args = args || []\r\n                            args = [context, args.slice ? args.slice() : args]\r\n                            if (firing) stack.push(args)\r\n                            else fire(args)\r\n                        }\r\n                        return this\r\n                    },\r\n                    fire: function() {\r\n                        return Callbacks.fireWith(this, arguments)\r\n                    },\r\n                    fired: function() {\r\n                        return !!fired\r\n                    }\r\n                }\r\n\r\n            return Callbacks\r\n        }\r\n    })(Zepto)\r\n\r\n    return Zepto\r\n}))\n\n//# sourceURL=webpack:///./src/js/zepto.js?");

/***/ })

/******/ });