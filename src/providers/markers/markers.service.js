module.exports = function(DefaultMarker, DOMMarker, SVGMarker, CONSTS) {

    var MARKER_TYPES = CONSTS.MARKER_TYPES;

    return {
        addMarkersToMap: addMarkersToMap,
        addUserMarker: addUserMarker,
        updateMarkers: updateMarkers,
        addinfoBubble: addinfoBubble,
        isMarkerInstance: isMarkerInstance
    }
    
    function isMarkerInstance(target) {
        return target instanceof H.map.Marker || target instanceof H.map.DomMarker;
    }

    function addUserMarker(map, place) {//TODO
        var styles = [
            "border-radius: 50%",
            "background-color: rgba(38, 33, 97, .8)",
            "height: 12px",
            "width: 12px"
        ];

        var markup = '<div style="{style}"></div>';
        place.markup = markup.replace(/{style}/, styles.join(';'));

        var creator = new DOMMarker(place);

        map.addObject(creator.create());

        // var marker = new H.map.Circle(place.pos, 10000, {
        //         style: {
        //             strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        //             lineWidth: 2,
        //             fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
        //         }
        //     }
        // );

        // map.addObject(marker);
    }

    function addMarkersToMap(map, places) {
        if (!places || !places.length)
            return false;

        if (!(map instanceof H.Map))
            throw new Error('Unsupported map instance');

        if (!map.markersGroup)
            map.markersGroup = new H.map.Group();

        places.forEach(function(place, i) {
            var creator = _getMarkerCreator(place),
                marker = place.draggable ? _draggableMarkerMixin(creator.create()) : creator.create();

            map.markersGroup.addObject(marker);
        });

        map.addObject(map.markersGroup);
    }

    function updateMarkers(map, places) {
        if (map.markersGroup) {
            map.markersGroup.removeAll();
            map.removeObject(map.markersGroup);
            map.markersGroup = null;
        }

        addMarkersToMap.apply(null, arguments);
    }

    function addinfoBubble(ui, group) {
        if (!group || !ui)
            return;

        group.addEventListener('tap', _groupEventHandler.bind(group, ui), false);
    }

    function _groupEventHandler(ui, e) {
        var target = e.target;
        
        if(ui.bubble && ui.bubble.getState() === CONSTS.INFOBUBBLE_STATES.OPEN) {
            ui.bubble.close();
        }
        
        if(target.bubble) {
            ui.bubble = target.bubble;
            target.bubble.open();
            return;
        }
        
        var bubble = new H.ui.InfoBubble(e.target.getPosition(), {
            content: target.getData()
        });
        target.bubble = bubble;
        ui.addBubble(bubble);
        ui.bubble = bubble;
    }

    function _getMarkerCreator(place) {
        var ConcreteMarker,
            type = place.type ? place.type.toUpperCase() : null;

        switch (type) {
            case MARKER_TYPES.DOM:
                ConcreteMarker = DOMMarker;
                break;
            case MARKER_TYPES.SVG:
                ConcreteMarker = SVGMarker;
                break;
            default:
                ConcreteMarker = DefaultMarker;
        }

        return new ConcreteMarker(place);
    }

    function _draggableMarkerMixin(marker) {
        marker.draggable = true;

        return marker;
    }

};