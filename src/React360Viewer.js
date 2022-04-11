import React, { Component } from "react";
import './style.css'

class React360Viewer extends Component {

    constructor() {
        super();
        this.viewPercentageRef = React.createRef();
        this.viewPortElementRef = React.createRef();
        this.canvas = null
        this.ctx = null
        this.imageData = []
        this.images = []
        this.loadedImages = 0
        this.viewerPercentage = null
        this.currentImage = null
        this.currentLeftPosition = this.currentTopPosition = 0
        this.currentCanvasImage = null
        this.centerX = 0
        this.centerY = 0
        this.movementStart = 0
        this.movement = false
        this.speedFactor = 13
        this.activeImage = 1
        this.stopAtEdges = false

        this.state = {
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
        }
    }

    componentDidMount(){
        this.viewerPercentage = this.viewPercentageRef.current
        this.viewPortElementRef = this.viewerContainerRef.getElementsByClassName('v360-viewport-container')[0]
        this.fetchData()
    }

    fetchData(){
        for(let i=1; i <= this.props.amount; i++){
            const imageIndex = (this.props.paddingIndex) ? this.lpad(i, "0", 2) : i
            const fileName = this.props.fileName.replace('{index}', imageIndex);
            const filePath = `${this.props.imagePath}/${fileName}`
            this.imageData.push(filePath)
        }

        this.preloadImages()
    }

    lpad(str, padString, length) {
        str = str.toString()
        while (str.length < length) str = padString + str
        return str
    }

    preloadImages() {
        if (this.imageData.length) {
            try {
                this.imageData.forEach(src => {
                    this.addImage(src);
                });
            } catch (error) {
                console.error(`Something went wrong while loading images: ${error.message}`);
            }
        } else {
            console.log('No Images Found')
        }
    }

    addImage(resultSrc){
        const image = new Image();
        image.src = resultSrc;
        image.onload = this.onImageLoad.bind(this);
        image.onerror = this.onImageLoad.bind(this);
        this.images.push(image);
    }

    onImageLoad(event) {
        const percentage = Math.round(this.loadedImages / this.props.amount * 100);
        this.loadedImages += 1;
        this.updatePercentageInLoader(percentage);
        if (this.loadedImages === this.props.amount) {
            this.onAllImagesLoaded(event);
        } else if (this.loadedImages === 1) {
            console.log('load first image')
        }
    }

    updatePercentageInLoader(percentage) {
        this.viewerPercentage.innerHTML = percentage + '%';
    }

    onAllImagesLoaded(e){
        this.setState({ imagesLoaded: true })
        
        this.initData()
    }

    initData(){
        this.canvas = this.imageContainerRef
        this.ctx = this.canvas.getContext('2d')

        this.attachEvents();
        this.loadInitialImage()
    }

    attachEvents(){
        this.bind360ModeEvents()
    }
    
    bind360ModeEvents(){
        this.viewPortElementRef.removeEventListener('touchend', this.stopDragging);
        this.viewPortElementRef.removeEventListener('touchstart', this.startDragging);
        this.viewPortElementRef.removeEventListener('touchmove', this.doDragging); 

        this.viewPortElementRef.addEventListener('touchend', this.touchEnd);
        this.viewPortElementRef.addEventListener('touchstart', this.touchStart);
        this.viewPortElementRef.addEventListener('touchmove', this.touchMove); 

        this.viewPortElementRef.removeEventListener('mouseup', this.stopDragging);
        this.viewPortElementRef.removeEventListener('mousedown', this.startDragging);
        this.viewPortElementRef.removeEventListener('mousemove', this.doDragging); 
        
        this.viewPortElementRef.addEventListener('mouseup', this.stopMoving);
        this.viewPortElementRef.addEventListener('mousedown', this.startMoving);
        this.viewPortElementRef.addEventListener('mousemove', this.doMoving);
    }

    startDragging = (evt) => {
        this.dragging = true
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        this.setLastPositions(evt)
        
        this.dragStart = this.ctx.transformedPoint(this.state.lastX,this.state.lastY);
    }

    setLastPositions(evt){
        this.setState({ 
            lastX: evt.offsetX || (evt.pageX - this.canvas.offsetLeft),
            lastY: evt.offsetY || (evt.pageY - this.canvas.offsetTop) 
        })
    }

    doDragging = (evt) => {
        
        this.setLastPositions(evt)
        
        if (this.dragStart){
            let pt = this.ctx.transformedPoint(this.state.lastX,this.state.lastY);
            this.ctx.translate(pt.x-this.dragStart.x,pt.y-this.dragStart.y);
            //redraw();
            this.redraw();
        }
    }

    stopDragging = (evt) => {
        this.dragging = false
        this.dragStart = null
    }

    loadInitialImage(){
        this.currentImage = this.imageData[0] 
        this.setImage()
    }

    setImage(cached = false){
        this.currentLeftPosition = this.currentTopPosition = 0
        
        if(!cached){
            this.currentCanvasImage = new Image()
            this.currentCanvasImage.crossOrigin='anonymous'
            this.currentCanvasImage.src = this.currentImage
            this.currentCanvasImage.onload = () => {
                let viewportElement = this.viewPortElementRef.getBoundingClientRect()
                this.canvas.width  = (this.state.isFullScreen) ? viewportElement.width : this.currentCanvasImage.width
                this.canvas.height = (this.state.isFullScreen) ? viewportElement.height : this.currentCanvasImage.height
                this.trackTransforms(this.ctx)
                this.redraw()
            }
            this.currentCanvasImage.onerror = () => {
                console.log('cannot load this image')
            }
        }else{
            this.currentCanvasImage = this.images[0]
            let viewportElement = this.viewPortElementRef.getBoundingClientRect()
            this.canvas.width  = (this.state.isFullScreen) ? viewportElement.width : this.currentCanvasImage.width
            this.canvas.height = (this.state.isFullScreen) ? viewportElement.height : this.currentCanvasImage.height
            this.trackTransforms(this.ctx)
            this.redraw()
        }
        
    }

    redraw(){
        try {
            let p1 = this.ctx.transformedPoint(0,0);
            let p2 = this.ctx.transformedPoint(this.canvas.width,this.canvas.height)
            let hRatio = this.canvas.width / this.currentCanvasImage.width
            let vRatio =  this.canvas.height / this.currentCanvasImage.height
            let ratio  = Math.min(hRatio, vRatio);
            let centerShift_x = (this.canvas.width - this.currentCanvasImage.width*ratio )/2
            let centerShift_y = (this.canvas.height - this.currentCanvasImage.height*ratio )/2
            this.ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
            this.centerX = this.currentCanvasImage.width*ratio/2
            this.centerY = this.currentCanvasImage.height*ratio/2
            
            //center image
            this.ctx.drawImage(this.currentCanvasImage, this.currentLeftPosition, this.currentTopPosition, this.currentCanvasImage.width, this.currentCanvasImage.height,
                        centerShift_x,centerShift_y,this.currentCanvasImage.width*ratio, this.currentCanvasImage.height*ratio);  
            //this.addHotspots()
        }
        catch(e){
            this.trackTransforms(this.ctx)
        }
    }

    trackTransforms(ctx){
        return new Promise(resolve => {
            var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
            var xform = svg.createSVGMatrix();
            this.ctx.getTransform = function(){ return xform; };
            
            var savedTransforms = [];
            var save = ctx.save;
            this.ctx.save = () => {
                savedTransforms.push(xform.translate(0,0));
                return save.call(this.ctx);
            };
            var restore = ctx.restore;
            this.ctx.restore = () => {
                xform = savedTransforms.pop();
                return restore.call(this.ctx);
            };
            var scale = this.ctx.scale;
            this.ctx.scale = (sx,sy) => {
                xform = xform.scaleNonUniform(sx,sy);
                return scale.call(this.ctx,sx,sy);
            };
            var rotate = this.ctx.rotate;
            this.ctx.rotate = (radians) => {
                xform = xform.rotate(radians*180/Math.PI);
                return rotate.call(this.ctx,radians);
            };
            var translate = this.ctx.translate;
            this.ctx.translate = (dx,dy) => {
                xform = xform.translate(dx,dy);
                return translate.call(this.ctx,dx,dy);
            };
            var transform = this.ctx.transform;
            this.ctx.transform = (a,b,c,d,e,f) => {
                var m2 = svg.createSVGMatrix();
                m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
                xform = xform.multiply(m2);
                return transform.call(this.ctx,a,b,c,d,e,f);
            };
            var setTransform = this.ctx.setTransform;
            this.ctx.setTransform = (a,b,c,d,e,f) => {
                xform.a = a;
                xform.b = b;
                xform.c = c;
                xform.d = d;
                xform.e = e;
                xform.f = f;
                return setTransform.call(this.ctx,a,b,c,d,e,f);
            };
            var pt  = svg.createSVGPoint();
            this.ctx.transformedPoint = (x,y) => {
                pt.x=x; pt.y=y;
                return pt.matrixTransform(xform.inverse());
            }
            resolve(this.ctx)
        })
        
    }

    moveActiveIndexUp(itemsSkipped) {
        if (this.stopAtEdges) {
            if (this.activeImage + itemsSkipped >= this.props.amount) {
                this.activeImage = this.props.amount;
            } else {
                this.activeImage += itemsSkipped;
            }
        } else {
            this.activeImage = (this.activeImage + itemsSkipped) % this.props.amount || this.props.amount;
        }
        
        this.update()
    }

    moveActiveIndexDown(itemsSkipped) {
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
        
        this.update()
    }

    update() {
        const image = this.images[this.activeImage - 1];
        this.currentCanvasImage = image
        this.redraw()
    }

    onMove(pageX){
        if (pageX - this.movementStart >= this.speedFactor) {
            let itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;
            
            this.movementStart = pageX;
            if (this.props.spinReverse) {
                this.moveActiveIndexDown(itemsSkippedRight);
            } else {
                this.moveActiveIndexUp(itemsSkippedRight);
            }
            this.redraw();
        } else if (this.movementStart - pageX >= this.speedFactor) {
            let itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;
            
            this.movementStart = pageX;
            if (this.props.spinReverse) {
                this.moveActiveIndexUp(itemsSkippedLeft);
            } else {
                this.moveActiveIndexDown(itemsSkippedLeft);
            }
            this.redraw();
        }
    }

    startMoving = (evt) => {
        this.movement = true
        this.movementStart = evt.pageX;
        this.viewPortElementRef.style.cursor = 'grabbing';
    }

    doMoving = (evt) => {
        if(this.movement){
            this.onMove(evt.clientX)
        }
    }

    stopMoving = (evt) => {
        this.movement = false
        this.movementStart = 0
        this.viewPortElementRef.style.cursor = 'grab'
    }

    touchStart = (evt) => {
        this.movementStart = evt.touches[0].clientX
    }

    touchMove = (evt) => {
        this.onMove(evt.touches[0].clientX)
    }

    touchEnd = () => {
        this.movementStart = 0
    }

    render() {
        
        return (
            <div>
                <div className="v360-viewer-container" ref={(inputEl) => {this.viewerContainerRef = inputEl}} id="identifier" >

                    {!this.state.imagesLoaded ? 
                    <div className="v360-viewport">
                        <div className="v360-spinner-grow"></div>
                        <p ref={this.viewPercentageRef} className="v360-percentage-text"></p>
                    </div> : '' }
                    <div className="v360-viewport-container v360-viewport">
                        <canvas 
                            className="v360-image-container" 
                            ref={(inputEl) => {this.imageContainerRef = inputEl}} 
                        ></canvas>
                        {this.props.boxShadow ? <div className="v360-product-box-shadow"></div> : ''}
                    </div>
                </div>
            </div>
            
        );
    }

}

export default React360Viewer;