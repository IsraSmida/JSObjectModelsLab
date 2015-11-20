(function(global) {
  'use strict';
  global.Shapes = {
    VERSION:'0.0.1'
  };

  function createShape(attributes) {
    attributes = attributes;
    attributes._id = parseInt(attributes._id);
    attributes.name = attributes.name;
    attributes.nodes = attributes.nodes;

    if (typeof attributes._id !== 'number' || !Array.isArray(attributes.nodes)) {
      throw {
        name: "TypeError",
        message: "Erreur de types d'attributs"
      };
    }

    var shape = {};
    shape.id = function() {
      return attributes._id;
    };
    shape.getName = function() {
      return attributes.name || "";
    };
    shape.toString = function() {
      return "( ID :" + attributes._id + ", Name : " + attributes.name + ", nodes : " + attributes.nodes + ")";
    };
    shape.toSvgPath = function() {
      function toTableaux(obj){
        var tab = [];
        tab.push(obj.x);
        tab.push(obj.y);
        return tab;
      };
      var newTab =  attributes.nodes.map(toTableaux);
      function chaine(obj) {
        var ch = " ";
        return ch + obj.join(" ");
      }
      var path = newTab.map(chaine);
      var newPath = "M";
      return newPath + path.join(" L");
    };
    return shape;
  };

  function createRoad(attributes) {
    attributes = attributes;
    var road = createShape(attributes);
    road.getCategory = function() {
      return attributes.highway;
    };
    road.category = road.getCategory();
    return road;
  };

  function createBuilding(attributes) {
    attributes = attributes;
    var building = createShape(attributes);

    building.getArea = function() {
      var area = 0;
      //TODO

      return area;
    };
    building.area = building.getArea();
    return building;
  };

  function createAmenity(attributes) {
    attributes = attributes;
    var amenity = createShape(attributes);
    amenity.getType = function() {
      return attributes.amenity;
    };
    amenity.type = amenity.getType();
    return amenity;
  };

  function createNatural(attributes) {
    attributes = attributes;
    var natural = createShape(attributes);
    natural.getType = function() {
      return attributes.natural;
    };
    natural.type = natural.getType();
    return natural;
  };

  global.Shapes.createShape = createShape;
  global.Shapes.createRoad = createRoad;
  global.Shapes.createBuilding = createBuilding;
  global.Shapes.createAmenity = createAmenity;
  global.Shapes.createNatural = createNatural;

}(this));
