require('./jquery-image-map-editor.css');

(function ($) {


    class ImageMapEditor {

        constructor(item, options) {
            this.options = $.extend({
                drawingTypes: [
                    'Polygon', 'Circle', 'Rectange'
                ],
                drawedShapes: [],
                activeShape: null,
                points: [],
            }, options);

            this.item = $(item);
            this.init();
        }

        init() {
            const editorElement = $(this.item).wrap('<div class="image-map-editor"></div>').parent();
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            $(svg).addClass('image-map-editor-svg')
                .appendTo(editorElement)
                .on('mousedown', (e) => {
                    this.addPoint(this.convertRelativeCoordinates(e));
                })
                .on('mouseup', (e) => {
                    this.render(svg);
                });
        }

        draws() {
            return [...this.options.drawedShapes];
        }

        addDraw(draw) {
            this.options.drawedShapes.push({
                type: draw.type,
                points: [],
                name: `Item ${this.options.drawedShapes.length + 1}`
            });
            this.options.activeShape = this.options.drawedShapes[this.options.drawedShapes.length - 1];
        }

        addPoint(point) {
            if (this.options.activeShape) {
                this.options.activeShape.points.push(point);
            }
        }

        bindEvents(item) {

        }

        render(svg) {
            this.clear(svg);
            this.options.drawedShapes.forEach((element, elementIndex) => {
                element.points.forEach((point, index) => {
                    $(svg).append(this.createPointElement(point.x, point.y, elementIndex, index));
                })

                $(svg).append(this.createShapeElement(this.implodePoints(element.points), elementIndex));
            })

        }
        convertRelativeCoordinates(event) {
            var bounds = event.target.getBoundingClientRect();
            var x = event.clientX - bounds.left;
            var y = event.clientY - bounds.top;

            return {
                x,
                y
            }
        }

        implodePoints(elementPoints) {
            return elementPoints.map(p => p.x + ',' + p.y).join(',');
        }

        createSvgElement(tag, attrs) {
            var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
        }

        createShapeElement(points, elementId) {
            const shape = this.createSvgElement('polygon', { points });
            $(shape).addClass('image-map-editor-svg__shape')
            $(shape).data('shape-id', elementId);

            return shape;
        }

        createPointElement(x, y, elementId, pointId) {
            const pointElement = this.createSvgElement('circle', { cx: x, cy: y, r: 5 });
            $(pointElement).addClass('image-map-editor-svg__point')
            $(pointElement).data('shape-id', elementId)
            $(pointElement).data('pount-id', pointId);

            return pointElement;
        }

        clear(element) {
            $(element).children().remove();
        }

        update(index, element, event) {
            const pos = this.convertRelativeCoordinates(event);
            // this.points[index] = pos;
            element.setAttribute('cx', pos.x);
            element.setAttribute('cy', pos.y);
        }
    }



    $.fn.imageMapEditor = function (opt) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (typeof opt === 'string') {
            var item = $(this), instance = item.data('ImageMapEditor');
            if (instance) {
                return instance[opt].call(instance, args);
            }
        } else {
            return this.each(function () {
                var item = $(this), instance = item.data('ImageMapEditor');
                if (!instance) {
                    item.data('ImageMapEditor', new ImageMapEditor(this, opt));
                }
            });
        }
    };

})(jQuery);


$(document).ready(function () {
    $('.demo').imageMapEditor();

    $('#addNewPolygon').click(function () {
        $('#image1').imageMapEditor('addDraw', {
            type: 'Polygon'
        });
        refreshItems();

    })

    refreshItems();

    function refreshItems() {
        $('#draws').children().remove();
        const items = $('#image1').imageMapEditor('draws');
        items.forEach((item) => {
            $('#draws').append('<option value="' + item.index + '">' + item.name + '</option>');
        });
    }
});