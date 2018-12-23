"use strict";

function Scroller(name, row, item, count, toggler, wideScreenOrientation, mobileScreenOrientation) {
    let self = this;
    this.name = name;
    this.row = row;
    this.adaptiveEdge = parseInt(this.row.attributes.jsAdaptive.value);
    this.rowStyles = getComputedStyle(this.row);
    this.rowMarginTop = parseInt(this.rowStyles.marginTop);
    this.rowMarginLeft = parseInt(this.rowStyles.marginLeft);
    this.item = item;
    this.count = count;
    this.counter = 0;
    this.itemStyle = getComputedStyle(this.item);
    this.verticalScrollValue = parseInt(this.itemStyle.height) + parseInt(this.itemStyle.marginBottom);
    this.horizontalScrollValue = parseInt(this.itemStyle.width) + parseInt(this.itemStyle.marginRight);
    this.toggler = toggler;
    this.docWidth = document.body.clientWidth;
    this.wideScreenOrientation = wideScreenOrientation;
    this.mobileScreenOrientation = mobileScreenOrientation;


    this.row.addEventListener('swiped-left', () => {
        if (document.body.clientWidth <= this.adaptiveEdge && (self.counter < self.count - 1)) {
            let currentMargin = parseInt(self.rowMarginLeft);
            currentMargin -= self.horizontalScrollValue;
            currentMargin += 'px';
            self.row.style.marginLeft = currentMargin;
            self.rowMarginLeft -= self.horizontalScrollValue;
            self.counter++;
        }
        else if (document.body.clientWidth <= this.adaptiveEdge && (self.counter >= self.count - 1)) {
            self.row.style.marginLeft = "0px";
            self.rowMarginLeft = 0;
            self.counter = 0;
        }
    });

    this.row.addEventListener('swiped-right', () => {
        if (document.body.clientWidth <= this.adaptiveEdge && (self.counter > 0)) {
            let currentMargin = parseInt(self.rowMarginLeft);
            currentMargin += self.horizontalScrollValue;
            currentMargin += 'px';
            self.row.style.marginLeft = currentMargin;
            self.rowMarginLeft += self.horizontalScrollValue;
            self.counter--;
        }
        else if (document.body.clientWidth <= this.adaptiveEdge && (self.counter <= 0)) {
            self.row.style.marginLeft = "50px";
            setTimeout(function()  {self.row.style.marginLeft = "0px"}, 100);
        }
    });


        this.toggler.addEventListener("click", () => {
            if (document.body.clientWidth > this.adaptiveEdge) {
                if (self.counter < self.count - 1) {
                    let currentMargin = parseInt(self.rowMarginTop);
                    currentMargin -= self.verticalScrollValue;
                    currentMargin += 'px';
                    self.row.style.marginTop = currentMargin;
                    self.rowMarginTop -= self.verticalScrollValue;
                    self.counter++;
                }
                else {
                    self.row.style.marginTop = 0;
                    self.rowMarginTop = 0;
                    self.counter = 0;
                }
            }
        });


    window.addEventListener("resize", () => {
        console.log('this.docWidth: ' + this.docWidth);
        console.log('document.body.clientWidth: ' + document.body.clientWidth);
        if (document.body.clientWidth > this.adaptiveEdge) {


            if (this.docWidth <= this.adaptiveEdge) {
                //    this.row.style.transitionDuration = "0s";
                this.verticalScrollValue = parseInt(getComputedStyle(this.item).height) + parseInt(getComputedStyle(this.item).marginBottom);
                self.row.style.marginLeft = 0;
            }
        } else {
            if (this.docWidth > this.adaptiveEdge) {
                //    this.row.style.transitionDuration = "0s";

                this.horizontalScrollValue = parseInt(getComputedStyle(this.item).width) + parseInt(getComputedStyle(this.item).marginRight);
                self.row.style.marginTop = 0;
            }

        }
        this.docWidth = document.body.clientWidth;
        // this.row.style.transitionDuration = "0.3s";
    });
}



let main = new Scroller('main',
                        document.querySelector("[jsRow='main']"),
                        document.querySelector("[jsRow='main']").firstElementChild,
                        document.querySelector("[jsRow='main']").childElementCount,
                        document.querySelector("[jsToggler='main']",
                        'vertical',
                        'horizontal'),
);


let scripts = new Scroller('scripts',
                            document.querySelector("[jsRow='scripts']"),
                            document.querySelector("[jsRow='scripts']").firstElementChild,
                            document.querySelector("[jsRow='scripts']").childElementCount,
                            document.querySelector("[jsToggler='scripts']",
                            'horizontal',
                            'horizontal'),
);

let devices = new Scroller('devices',
                            document.querySelector("[jsRow='devices']"),
                            document.querySelector("[jsRow='devices']").firstElementChild,
                            document.querySelector("[jsRow='devices']").childElementCount,
                            document.querySelector("[jsToggler='devices']",
                            'horizontal',
                            'horizontal'),
);