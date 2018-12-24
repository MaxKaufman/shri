"use strict";


function Scroller(name, row, item, count, wideScreenOrientation, mobileScreenOrientation, togglerNext = null, togglerPrev = null) {
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
    this.togglerNext = togglerNext;
    this.togglerPrev = togglerPrev;
    this.docWidth = document.body.clientWidth;
    this.wideScreenOrientation = wideScreenOrientation;
    this.mobileScreenOrientation = mobileScreenOrientation;

    if (this.togglerNext) {
        this.togglerNext.addEventListener("mousedown", () => {
            toggleItemsForward();
        });
    }
    if (this.togglerPrev) {
        this.togglerPrev.addEventListener('mousedown', () => {
            toggleItemsPrev();
        });
    }


    function toggleItemsForward() {
        if (self.togglerNext !== null) {
            if (self.wideScreenOrientation === "vertical") {
                if (document.body.clientWidth > self.adaptiveEdge) {
                    if (self.counter < self.count - 2) {
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
            }
            else {
                if (document.body.clientWidth > self.adaptiveEdge) {
                    ;
                    if (self.counter < self.count - 2) {
                        let currentMargin = parseInt(self.rowMarginLeft);
                        currentMargin -= self.horizontalScrollValue;
                        currentMargin += 'px';
                        self.row.style.marginLeft = currentMargin;
                        self.rowMarginLeft -= self.horizontalScrollValue;
                        self.counter++;
                    }
                    else {
                        self.row.style.marginLeft = 0;
                        self.rowMarginLeft = 0;
                        self.counter = 0;
                    }
                }
            }
        }
    }

    function toggleItemsPrev() {
        if (self.togglerPrev !== null) {
            if (self.wideScreenOrientation === "horizontal") {
                if (document.body.clientWidth > self.adaptiveEdge) {
                    if (self.counter > 0) {
                        let currentMargin = parseInt(self.rowMarginLeft);
                        currentMargin += self.horizontalScrollValue;
                        currentMargin += 'px';
                        self.row.style.marginLeft = currentMargin;
                        self.rowMarginLeft += self.horizontalScrollValue;
                        self.counter--;
                    }
                    else {
                        self.row.style.marginLeft = "50px";
                        setTimeout(function () {
                            self.row.style.marginLeft = "0px"
                        }, 100);
                        self.rowMarginLeft = 0;
                        self.counter = 0;
                    }
                }
            }
        }
    }


    this.row.addEventListener('swiped-left', () => {
        if (document.body.clientWidth <= this.adaptiveEdge && (self.counter < self.count - 2)) {
            let currentMargin = parseInt(self.rowMarginLeft);
            currentMargin -= self.horizontalScrollValue;
            currentMargin += 'px';
            self.row.style.marginLeft = currentMargin;
            self.rowMarginLeft -= self.horizontalScrollValue;
            self.counter++;
        }
        else if (document.body.clientWidth <= this.adaptiveEdge && (self.counter >= self.count - 2)) {
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
            setTimeout(function () {
                self.row.style.marginLeft = "0px"
            }, 100);
        }
    });

    window.addEventListener("resize", () => {
        if (document.body.clientWidth > this.adaptiveEdge) {
            if (this.docWidth <= this.adaptiveEdge) {
                this.verticalScrollValue = parseInt(getComputedStyle(this.item).height) + parseInt(getComputedStyle(this.item).marginBottom);
                self.row.style.marginLeft = 0;
            }
        } else {
            if (this.docWidth > this.adaptiveEdge) {
                this.horizontalScrollValue = parseInt(getComputedStyle(this.item).width) + parseInt(getComputedStyle(this.item).marginRight);
                self.row.style.marginTop = 0;
            }
        }
        this.docWidth = document.body.clientWidth;
    });
}

let deviceSelect = document.querySelectorAll('[devSelect]');
deviceSelect.forEach(function (el) {
    el.addEventListener('click',
        () => {
            if (el.getAttribute('devSelect') != 0) {
                let allElems = document.querySelectorAll('[devType]');
                allElems.forEach(function (elem) {
                    elem.classList.add('none');
                    if (elem.getAttribute('devtype') == el.getAttribute('devSelect')) {
                        elem.classList.remove('none')
                    }
                })
            }
            else {
                let allElems = document.querySelectorAll('[devType]');
                allElems.forEach(function (elem) {
                    elem.classList.remove('none')
                })
            }
        }
    );
});


let main = new Scroller('main',
    document.querySelector("[jsRow='main']"),
    document.querySelector("[jsRow='main']").firstElementChild,
    document.querySelector("[jsRow='main']").childElementCount,
    'vertical',
    'horizontal',
    document.querySelector("[jsTogglerType='mainNext']"),
    document.querySelector("[jsTogglerType='mainPrev']")
);


let scripts = new Scroller('scripts',
    document.querySelector("[jsRow='scripts']"),
    document.querySelector("[jsRow='scripts']").firstElementChild,
    document.querySelector("[jsRow='scripts']").childElementCount,
    'horizontal',
    'horizontal',
    document.querySelector("[jsTogglerType='scriptsNext']"),
    document.querySelector("[jsTogglerType='scriptsPrev']")
);

let devices = new Scroller('devices',
    document.querySelector("[jsRow='devices']"),
    document.querySelector("[jsRow='devices']").firstElementChild,
    document.querySelector("[jsRow='devices']").childElementCount,
    'horizontal',
    'horizontal',
    document.querySelector("[jsTogglerType='devicesNext']"),
    document.querySelector("[jsTogglerType='devicesPrev']"),
);
