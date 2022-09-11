(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("path",
{ "compressionlevel":-1,
 "height":12,
 "infinite":false,
 "layers":[
        {
         "data":[2, 11, 6, 5, 10, 1, 9, 12, 11, 1, 14, 16, 14, 4, 8, 16, 1, 1, 12, 3,
            10, 1, 8, 14, 4, 2, 15, 14, 5, 13, 12, 13, 13, 10, 4, 15, 13, 14, 14, 14,
            15, 2, 9, 8, 16, 2, 1, 13, 5, 9, 15, 1, 11, 13, 7, 8, 13, 3, 5, 4,
            14, 4, 8, 15, 6, 1, 3, 8, 10, 4, 16, 15, 9, 5, 1, 14, 4, 9, 7, 1,
            15, 12, 4, 2, 9, 6, 2, 14, 15, 6, 6, 10, 16, 16, 6, 7, 9, 7, 2, 8,
            14, 4, 8, 9, 2, 7, 6, 10, 6, 6, 1, 9, 16, 3, 10, 14, 6, 10, 15, 7,
            2, 6, 6, 8, 15, 4, 2, 12, 3, 11, 6, 6, 2, 11, 8, 14, 14, 1, 12, 6,
            13, 3, 15, 4, 1, 10, 12, 3, 2, 15, 15, 2, 2, 11, 3, 13, 7, 15, 4, 7,
            12, 5, 16, 1, 14, 1, 14, 13, 15, 9, 15, 8, 1, 3, 8, 7, 8, 14, 14, 11,
            1, 3, 16, 3, 14, 15, 15, 10, 9, 16, 8, 4, 16, 15, 2, 6, 16, 6, 9, 1,
            15, 11, 7, 11, 9, 11, 8, 6, 1, 12, 6, 11, 3, 2, 6, 15, 7, 14, 15, 10,
            10, 15, 7, 14, 1, 4, 4, 9, 4, 15, 13, 4, 1, 16, 14, 2, 16, 3, 5, 7],
         "height":12,
         "id":1,
         "name":"ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 25, 18, 18, 18, 18, 18, 18, 18, 18, 29, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 23, 17, 17, 17, 17, 17, 17, 17, 17, 22, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 23, 17, 21, 19, 19, 19, 19, 27, 17, 22, 0, 0, 25, 18, 18, 18, 18,
            0, 0, 0, 23, 17, 22, 0, 0, 0, 0, 23, 17, 22, 0, 0, 23, 17, 17, 17, 17,
            0, 0, 0, 23, 17, 22, 0, 0, 25, 18, 20, 17, 22, 0, 0, 23, 17, 21, 19, 19,
            18, 18, 18, 20, 17, 22, 0, 0, 23, 17, 17, 17, 22, 0, 0, 23, 17, 22, 0, 0,
            17, 17, 17, 17, 17, 22, 0, 0, 23, 17, 21, 19, 24, 0, 0, 23, 17, 22, 0, 0,
            19, 19, 19, 19, 19, 24, 0, 0, 23, 17, 22, 0, 0, 0, 0, 23, 17, 22, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 23, 17, 28, 18, 18, 18, 18, 20, 17, 22, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 23, 17, 17, 17, 17, 17, 17, 17, 17, 22, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 26, 19, 19, 19, 19, 19, 19, 19, 19, 24, 0, 0],
         "height":12,
         "id":5,
         "name":"outerPath",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":6,
         "name":"path",
         "objects":[
                {
                 "class":"",
                 "height":0,
                 "id":4,
                 "name":"",
                 "polyline":[
                        {
                         "x":0,
                         "y":0
                        }, 
                        {
                         "x":-254,
                         "y":492
                        }, 
                        {
                         "x":290,
                         "y":480
                        }, 
                        {
                         "x":292,
                         "y":160
                        }, 
                        {
                         "x":738,
                         "y":162
                        }, 
                        {
                         "x":738,
                         "y":416
                        }, 
                        {
                         "x":608,
                         "y":414
                        }, 
                        {
                         "x":612,
                         "y":674
                        }, 
                        {
                         "x":1060,
                         "y":678
                        }, 
                        {
                         "x":1060,
                         "y":290
                        }, 
                        {
                         "x":1492,
                         "y":288
                        }],
                 "rotation":0,
                 "visible":true,
                 "width":0,
                 "x":0,
                 "y":0
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 30, 0, 30, 0, 30, 0, 30, 0, 30, 0, 30, 0, 30, 0, 30, 0, 30, 0, 0,
            0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 30, 0, 30, 0, 0,
            0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 30, 0, 30, 0, 0,
            0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0,
            0, 30, 0, 0, 0, 0, 30, 0, 30, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0,
            0, 30, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 30, 0,
            0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 30, 0,
            0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 30, 0, 30, 0, 0, 0, 0, 30, 0,
            0, 0, 30, 0, 30, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0,
            0, 0, 30, 0, 30, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0,
            0, 0, 30, 0, 30, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0],
         "height":12,
         "id":7,
         "name":"build place",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }],
 "nextlayerid":8,
 "nextobjectid":5,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.9.1",
 "tileheight":64,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/..\/..\/Tile\/bg.tsx"
        }, 
        {
         "firstgid":17,
         "source":"..\/..\/..\/..\/Tile\/road_5.tsx"
        }, 
        {
         "firstgid":18,
         "source":"..\/..\/..\/..\/Tile\/road_2.tsx"
        }, 
        {
         "firstgid":19,
         "source":"..\/..\/..\/..\/Tile\/road_8.tsx"
        }, 
        {
         "firstgid":20,
         "source":"..\/..\/..\/..\/Tile\/road_13.tsx"
        }, 
        {
         "firstgid":21,
         "source":"..\/..\/..\/..\/Tile\/road_10.tsx"
        }, 
        {
         "firstgid":22,
         "source":"..\/..\/..\/..\/Tile\/road_6.tsx"
        }, 
        {
         "firstgid":23,
         "source":"..\/..\/..\/..\/Tile\/road_4.tsx"
        }, 
        {
         "firstgid":24,
         "source":"..\/..\/..\/..\/Tile\/road_9.tsx"
        }, 
        {
         "firstgid":25,
         "source":"..\/..\/..\/..\/Tile\/road_1.tsx"
        }, 
        {
         "firstgid":26,
         "source":"..\/..\/..\/..\/Tile\/road_7.tsx"
        }, 
        {
         "firstgid":27,
         "source":"..\/..\/..\/..\/Tile\/road_11.tsx"
        }, 
        {
         "firstgid":28,
         "source":"..\/..\/..\/..\/Tile\/road_12.tsx"
        }, 
        {
         "firstgid":29,
         "source":"..\/..\/..\/..\/Tile\/road_3.tsx"
        }, 
        {
         "firstgid":30,
         "source":"..\/..\/..\/..\/Desktop\/place.tsx"
        }],
 "tilewidth":64,
 "type":"map",
 "version":"1.9",
 "width":20
});