"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./style.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React360Viewer = /*#__PURE__*/function (_Component) {
  _inherits(React360Viewer, _Component);

  var _super = _createSuper(React360Viewer);

  function React360Viewer() {
    var _this;

    _classCallCheck(this, React360Viewer);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "startDragging", function (evt) {
      _this.dragging = true;
      document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';

      _this.setLastPositions(evt);

      _this.dragStart = _this.ctx.transformedPoint(_this.state.lastX, _this.state.lastY);
    });

    _defineProperty(_assertThisInitialized(_this), "doDragging", function (evt) {
      _this.setLastPositions(evt);

      if (_this.dragStart) {
        var pt = _this.ctx.transformedPoint(_this.state.lastX, _this.state.lastY);

        _this.ctx.translate(pt.x - _this.dragStart.x, pt.y - _this.dragStart.y); //redraw();


        _this.redraw();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stopDragging", function (evt) {
      _this.dragging = false;
      _this.dragStart = null;
    });

    _defineProperty(_assertThisInitialized(_this), "startMoving", function (evt) {
      _this.movement = true;
      _this.movementStart = evt.pageX;
      _this.viewPortElementRef.style.cursor = 'grabbing';
    });

    _defineProperty(_assertThisInitialized(_this), "doMoving", function (evt) {
      if (_this.movement) {
        _this.onMove(evt.clientX);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stopMoving", function (evt) {
      _this.movement = false;
      _this.movementStart = 0;
      _this.viewPortElementRef.style.cursor = 'grab';
    });

    _defineProperty(_assertThisInitialized(_this), "touchStart", function (evt) {
      _this.movementStart = evt.touches[0].clientX;
    });

    _defineProperty(_assertThisInitialized(_this), "touchMove", function (evt) {
      _this.onMove(evt.touches[0].clientX);
    });

    _defineProperty(_assertThisInitialized(_this), "touchEnd", function () {
      _this.movementStart = 0;
    });

    _this.viewPercentageRef = /*#__PURE__*/_react.default.createRef();
    _this.viewPortElementRef = /*#__PURE__*/_react.default.createRef();
    _this.canvas = null;
    _this.ctx = null;
    _this.imageData = [];
    _this.images = [];
    _this.loadedImages = 0;
    _this.viewerPercentage = null;
    _this.currentImage = null;
    _this.currentLeftPosition = _this.currentTopPosition = 0;
    _this.currentCanvasImage = null;
    _this.centerX = 0;
    _this.centerY = 0;
    _this.movementStart = 0;
    _this.movement = false;
    _this.speedFactor = 13;
    _this.activeImage = 1;
    _this.stopAtEdges = false;
    _this.state = {
      lastX: 0,
      lastY: 0,
      scale: 0.2,
      currentTopPosition: 0,
      currentLeftPosition: 0,
      currentImage: null,
      dragging: false,
      canvas: null,
      ctx: null,
      dragStart: null,
      currentCanvasImage: null,
      isFullScreen: false,
      viewPortElementWidth: null,
      movementStart: 0,
      movement: false,
      dragSpeed: 150,
      speedFactor: 13,
      activeImage: 1,
      stopAtEdges: false,
      imagesLoaded: false
    };
    return _this;
  }

  _createClass(React360Viewer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.viewerPercentage = this.viewPercentageRef.current;
      this.viewPortElementRef = this.viewerContainerRef.getElementsByClassName('v360-viewport-container')[0];
      this.fetchData();
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      for (var i = 1; i <= this.props.amount; i++) {
        var imageIndex = this.props.paddingIndex ? this.lpad(i, "0", 2) : i;
        var fileName = this.props.fileName.replace('{index}', imageIndex);
        var filePath = "".concat(this.props.imagePath, "/").concat(fileName);
        this.imageData.push(filePath);
      }

      this.preloadImages();
    }
  }, {
    key: "lpad",
    value: function lpad(str, padString, length) {
      str = str.toString();

      while (str.length < length) {
        str = padString + str;
      }

      return str;
    }
  }, {
    key: "preloadImages",
    value: function preloadImages() {
      var _this2 = this;

      if (this.imageData.length) {
        try {
          this.imageData.forEach(function (src) {
            _this2.addImage(src);
          });
        } catch (error) {
          console.error("Something went wrong while loading images: ".concat(error.message));
        }
      } else {
        console.log('No Images Found');
      }
    }
  }, {
    key: "addImage",
    value: function addImage(resultSrc) {
      var image = new Image();
      image.src = resultSrc;
      image.onload = this.onImageLoad.bind(this);
      image.onerror = this.onImageLoad.bind(this);
      this.images.push(image);
    }
  }, {
    key: "onImageLoad",
    value: function onImageLoad(event) {
      var percentage = Math.round(this.loadedImages / this.props.amount * 100);
      this.loadedImages += 1;
      this.updatePercentageInLoader(percentage);

      if (this.loadedImages === this.props.amount) {
        this.onAllImagesLoaded(event);
      } else if (this.loadedImages === 1) {
        console.log('load first image');
      }
    }
  }, {
    key: "updatePercentageInLoader",
    value: function updatePercentageInLoader(percentage) {
      this.viewerPercentage.innerHTML = percentage + '%';
    }
  }, {
    key: "onAllImagesLoaded",
    value: function onAllImagesLoaded(e) {
      this.setState({
        imagesLoaded: true
      });
      this.initData();
    }
  }, {
    key: "initData",
    value: function initData() {
      this.canvas = this.imageContainerRef;
      this.ctx = this.canvas.getContext('2d');
      this.attachEvents();
      this.loadInitialImage();
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      this.bind360ModeEvents();
    }
  }, {
    key: "bind360ModeEvents",
    value: function bind360ModeEvents() {
      this.viewPortElementRef.removeEventListener('touchend', this.stopDragging);
      this.viewPortElementRef.removeEventListener('touchstart', this.startDragging);
      this.viewPortElementRef.removeEventListener('touchmove', this.doDragging);
      this.viewPortElementRef.addEventListener('touchend', this.touchEnd);
      this.viewPortElementRef.addEventListener('touchstart', this.touchStart);
      this.viewPortElementRef.addEventListener('touchmove', this.touchMove);
      this.viewPortElementRef.removeEventListener('mouseup', this.stopDragging);
      this.viewPortElementRef.removeEventListener('mouseout', this.stopDragging);
      this.viewPortElementRef.removeEventListener('mousedown', this.startDragging);
      this.viewPortElementRef.removeEventListener('mousemove', this.doDragging);
      this.viewPortElementRef.addEventListener('mouseup', this.stopMoving);
      this.viewPortElementRef.addEventListener('mouseout', this.stopMoving);
      this.viewPortElementRef.addEventListener('mousedown', this.startMoving);
      this.viewPortElementRef.addEventListener('mousemove', this.doMoving);
    }
  }, {
    key: "setLastPositions",
    value: function setLastPositions(evt) {
      this.setState({
        lastX: evt.offsetX || evt.pageX - this.canvas.offsetLeft,
        lastY: evt.offsetY || evt.pageY - this.canvas.offsetTop
      });
    }
  }, {
    key: "loadInitialImage",
    value: function loadInitialImage() {
      this.currentImage = this.imageData[0];
      this.setImage();
    }
  }, {
    key: "setImage",
    value: function setImage() {
      var _this3 = this;

      var cached = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.currentLeftPosition = this.currentTopPosition = 0;

      if (!cached) {
        this.currentCanvasImage = new Image();
        this.currentCanvasImage.crossOrigin = 'anonymous';
        this.currentCanvasImage.src = this.currentImage;

        this.currentCanvasImage.onload = function () {
          var viewportElement = _this3.viewPortElementRef.getBoundingClientRect();

          _this3.canvas.width = _this3.state.isFullScreen ? viewportElement.width : _this3.currentCanvasImage.width;
          _this3.canvas.height = _this3.state.isFullScreen ? viewportElement.height : _this3.currentCanvasImage.height;

          _this3.trackTransforms(_this3.ctx);

          _this3.redraw();
        };

        this.currentCanvasImage.onerror = function () {
          console.log('cannot load this image');
        };
      } else {
        this.currentCanvasImage = this.images[0];
        var viewportElement = this.viewPortElementRef.getBoundingClientRect();
        this.canvas.width = this.state.isFullScreen ? viewportElement.width : this.currentCanvasImage.width;
        this.canvas.height = this.state.isFullScreen ? viewportElement.height : this.currentCanvasImage.height;
        this.trackTransforms(this.ctx);
        this.redraw();
      }
    }
  }, {
    key: "redraw",
    value: function redraw() {
      try {
        var p1 = this.ctx.transformedPoint(0, 0);
        var p2 = this.ctx.transformedPoint(this.canvas.width, this.canvas.height);
        var hRatio = this.canvas.width / this.currentCanvasImage.width;
        var vRatio = this.canvas.height / this.currentCanvasImage.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (this.canvas.width - this.currentCanvasImage.width * ratio) / 2;
        var centerShift_y = (this.canvas.height - this.currentCanvasImage.height * ratio) / 2;
        this.ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        this.centerX = this.currentCanvasImage.width * ratio / 2;
        this.centerY = this.currentCanvasImage.height * ratio / 2; //center image

        this.ctx.drawImage(this.currentCanvasImage, this.currentLeftPosition, this.currentTopPosition, this.currentCanvasImage.width, this.currentCanvasImage.height, centerShift_x, centerShift_y, this.currentCanvasImage.width * ratio, this.currentCanvasImage.height * ratio); //this.addHotspots()
      } catch (e) {
        this.trackTransforms(this.ctx);
      }
    }
  }, {
    key: "trackTransforms",
    value: function trackTransforms(ctx) {
      var _this4 = this;

      return new Promise(function (resolve) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var xform = svg.createSVGMatrix();

        _this4.ctx.getTransform = function () {
          return xform;
        };

        var savedTransforms = [];
        var save = ctx.save;

        _this4.ctx.save = function () {
          savedTransforms.push(xform.translate(0, 0));
          return save.call(_this4.ctx);
        };

        var restore = ctx.restore;

        _this4.ctx.restore = function () {
          xform = savedTransforms.pop();
          return restore.call(_this4.ctx);
        };

        var scale = _this4.ctx.scale;

        _this4.ctx.scale = function (sx, sy) {
          xform = xform.scaleNonUniform(sx, sy);
          return scale.call(_this4.ctx, sx, sy);
        };

        var rotate = _this4.ctx.rotate;

        _this4.ctx.rotate = function (radians) {
          xform = xform.rotate(radians * 180 / Math.PI);
          return rotate.call(_this4.ctx, radians);
        };

        var translate = _this4.ctx.translate;

        _this4.ctx.translate = function (dx, dy) {
          xform = xform.translate(dx, dy);
          return translate.call(_this4.ctx, dx, dy);
        };

        var transform = _this4.ctx.transform;

        _this4.ctx.transform = function (a, b, c, d, e, f) {
          var m2 = svg.createSVGMatrix();
          m2.a = a;
          m2.b = b;
          m2.c = c;
          m2.d = d;
          m2.e = e;
          m2.f = f;
          xform = xform.multiply(m2);
          return transform.call(_this4.ctx, a, b, c, d, e, f);
        };

        var setTransform = _this4.ctx.setTransform;

        _this4.ctx.setTransform = function (a, b, c, d, e, f) {
          xform.a = a;
          xform.b = b;
          xform.c = c;
          xform.d = d;
          xform.e = e;
          xform.f = f;
          return setTransform.call(_this4.ctx, a, b, c, d, e, f);
        };

        var pt = svg.createSVGPoint();

        _this4.ctx.transformedPoint = function (x, y) {
          pt.x = x;
          pt.y = y;
          return pt.matrixTransform(xform.inverse());
        };

        resolve(_this4.ctx);
      });
    }
  }, {
    key: "moveActiveIndexUp",
    value: function moveActiveIndexUp(itemsSkipped) {
      if (this.stopAtEdges) {
        if (this.activeImage + itemsSkipped >= this.props.amount) {
          this.activeImage = this.props.amount;
        } else {
          this.activeImage += itemsSkipped;
        }
      } else {
        this.activeImage = (this.activeImage + itemsSkipped) % this.props.amount || this.props.amount;
      }

      this.update();
    }
  }, {
    key: "moveActiveIndexDown",
    value: function moveActiveIndexDown(itemsSkipped) {
      if (this.stopAtEdges) {
        if (this.activeImage - itemsSkipped <= 1) {
          this.activeImage = 1;
        } else {
          this.activeImage -= itemsSkipped;
        }
      } else {
        if (this.activeImage - itemsSkipped < 1) {
          this.activeImage = this.props.amount + (this.activeImage - itemsSkipped);
        } else {
          this.activeImage -= itemsSkipped;
        }
      }

      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var image = this.images[this.activeImage - 1];
      this.currentCanvasImage = image;
      this.redraw();
    }
  }, {
    key: "onMove",
    value: function onMove(pageX) {
      if (pageX - this.movementStart >= this.speedFactor) {
        var itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;
        this.movementStart = pageX;

        if (this.props.spinReverse) {
          this.moveActiveIndexDown(itemsSkippedRight);
        } else {
          this.moveActiveIndexUp(itemsSkippedRight);
        }

        this.redraw();
      } else if (this.movementStart - pageX >= this.speedFactor) {
        var itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;
        this.movementStart = pageX;

        if (this.props.spinReverse) {
          this.moveActiveIndexUp(itemsSkippedLeft);
        } else {
          this.moveActiveIndexDown(itemsSkippedLeft);
        }

        this.redraw();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "v360-viewer-container",
        ref: function ref(inputEl) {
          _this5.viewerContainerRef = inputEl;
        },
        id: "identifier"
      }, !this.state.imagesLoaded ? /*#__PURE__*/_react.default.createElement("div", {
        className: "v360-viewport"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "v360-spinner-grow"
      }), /*#__PURE__*/_react.default.createElement("p", {
        ref: this.viewPercentageRef,
        className: "v360-percentage-text"
      })) : '', /*#__PURE__*/_react.default.createElement("div", {
        className: "v360-viewport-container v360-viewport"
      }, /*#__PURE__*/_react.default.createElement("canvas", {
        className: "v360-image-container",
        ref: function ref(inputEl) {
          _this5.imageContainerRef = inputEl;
        }
      }), this.props.boxShadow ? /*#__PURE__*/_react.default.createElement("div", {
        className: "v360-product-box-shadow"
      }) : '')));
    }
  }]);

  return React360Viewer;
}(_react.Component);

var _default = React360Viewer;
exports.default = _default;