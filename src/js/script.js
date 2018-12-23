"use strict";

function Scroller(name, trigger, row, item, count) {
    let self = this;
    this.name = name;
    this.trigger = trigger;
    this.row = row;
    this.rowStyles = getComputedStyle(this.row);
    this.rowMarginTop = parseInt(this.rowStyles.marginTop);
    this.item = item;
    this.count = count;
    this.counter = 0;
    this.itemStyle = getComputedStyle(this.item);
    this.scrollValue = parseInt(this.itemStyle.height) + parseInt(this.itemStyle.marginBottom);

    this.trigger.addEventListener("click", function () {
        if(document.body.clientWidth > '900' ){
            if(self.counter < self.count - 1 ){
                let currentMargin = parseInt(self.rowMarginTop);
                currentMargin -= self.scrollValue;
                currentMargin += 'px';
                self.row.style.marginTop = currentMargin;
                self.rowMarginTop -= self.scrollValue;
                self.counter++;
            }
            else {
                self.row.style.marginTop = 0;
                self.rowMarginTop = 0;
                self.counter = 0;
            }
        }
    });
}

let main = new Scroller('main',
                        document.querySelector("[jsScroller='main']"),
                        document.querySelector("[jsRow='main']"),
                        document.querySelector("[jsRow='main']").firstElementChild,
                        document.querySelector("[jsRow='main']").childElementCount,
                        );
