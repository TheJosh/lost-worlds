$(document).ready(function() {
    var tileSize = 32;
    var tileDefault = 1;   // dirt
    var mapWidth = 256;
    var mapHeight = 64;
    var currTool = toolBrush;
    var currBrushVal = 0;
    var mouseDown = false;
    var $table;
    var $canvas;


    function setup() {
        var html = '<table class="map" style="width: ' + (tileSize * mapWidth) + 'px;">';
        for (var y = 1; y <= mapHeight; ++y) {
            html += '<tr>';
            for (var x = 1; x <= mapWidth; ++x) {
                html += '<td data-val="' + tileDefault + '" class="tile"></td>';
            }
            html += '</tr>';
        }
        html += '</table>';

        $table = $(html);
        $table.on('mousedown', function(){ return false; });
        $table.on('click', 'td', evCellClick);
        $table.on('mousedown', 'td', evCellMouseDown);
        $table.on('mouseover', 'td', evCellMouseOver);
        $table.on('mouseup', 'td', evCellMouseUp);

        html = '<canvas width="' + (mapWidth / 4) + '" height="' + mapHeight + '" style="position: fixed; right: 0; top: 100px; z-index: 9999"></canvas>';
        $canvas = $(html);

        $('.map-container').append($table);
        $('head').append('<style>.map td { width: ' + tileSize + 'px; height: ' + tileSize + 'px; }</style>');
        $('body').append($canvas);
    }

    function hlTool($this) {
        $('.tool.on').removeClass('on');
        $this.addClass('on');
    }
    
    $('.tool.brush').on('click', function() {
        hlTool($(this));
        currTool = toolBrush;
        currBrushVal = $(this).attr('data-val');
    });

    $('.tool.spawn').on('click', function() {
        hlTool($(this));
        currTool = toolSpawn;
    });

    $('.tool.save').on('click', function() {
        save();
    });


    function toolBrush($cell) {
        $cell.attr('data-val', currBrushVal).attr('class', 'tile');
    }

    function toolSpawn($cell) {
        $cell.attr('data-val', 0).attr('class', 'spawn');
    }


    function evCellClick() {
        currTool($(this));
    }

    function evCellMouseDown() {
        mouseDown = true;
    }

    function evCellMouseOver() {
        if (mouseDown && currTool == toolBrush) {
            toolBrush($(this));
        }
    }

    function evCellMouseUp() {
        mouseDown = false;
    }


    function save() {
        // Flatten vals into an array
        var data = [];
        $table.find('tr').each(function() {
            $(this).find('td').each(function() {
                data.push(parseInt($(this).attr('data-val'), 10));
            });
        });

        var ctx = $canvas[0].getContext('2d');

        var idx = 0;
        for (var y = 0; y < mapHeight; ++y) {
            for (var x = 0; x < mapWidth; x += 4, idx += 4) {
                var byte = data[idx] + (data[idx+1] << 2) + (data[idx+2] << 4) + (data[idx+3] << 6);
                var hex = byte.toString(16);
                ctx.fillStyle = '#' + hex + hex + hex;
                ctx.fillRect(x / 4, y, 1, 1);
            }
        }
    }


    setup();
});
