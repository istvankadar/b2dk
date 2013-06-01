
var scale = 30;
var fps = 60;
var world;
var layer;

var debug = false;

    function createDesk(container, thickness) {

        // Body and fixture defs for desk borders
        var fixDef = new Box2D.Dynamics.b2FixtureDef;
        fixDef.density = 0.1;
        fixDef.friction = 0.6;
        fixDef.restitution = 1;
        fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;


        // Horizontal borders
        fixDef.shape.SetAsBox( ( ( (container.width() / 2) ) / scale), thickness / scale );

        bodyDef.position.Set( ( (container.width() / 2) / scale), (0 - (thickness * 1) / scale) );
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.position.Set( ( (container.width() / 2) / scale), ( (container.height() + thickness ) / scale) );
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        // Vertical borders
        fixDef.shape.SetAsBox(thickness / scale, ( ( (container.height() / 2) ) / scale));

        bodyDef.position.Set((0 - (thickness * 1) / scale), ( (container.height() / 2) / scale));
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.position.Set( ( (container.width() + thickness) / scale), ( (container.height() / 2) / scale));
        world.CreateBody(bodyDef).CreateFixture(fixDef);

    }

    /**
    *
    * Ths function get a shape definition as parameter and creates a Kinetic shape (currentShape)
    * and a Box2d body (currentBody) and encapsulate them into a B2DK object.
    *
    *   Sample shape definition:
    *   {
    *      shapeName: 'circle',
    *      config: {
    *         radius: 40,
    *         x: 5,
    *         y: 5,
    *         fill: 'red',
    *         stroke: 'black',
    *         strokeWidth: defaultStrokeWidth,
    *         draggable: true
    *      },
    *      fixDef: {
    *           density:  0.1,
    *           friction:  0.6,
    *           restitution:  0.5,
    *      }
    *   }
    *
    *
    * @param {Object} shapedef Shape definition
    * @returns {B2DK}
    */
    function B2dKFactory(shapeDef) {

        var currentShape;

        var fixDef = new Box2D.Dynamics.b2FixtureDef;
        fixDef.density     = shapeDef.fixDef.density;
        fixDef.friction    = shapeDef.fixDef.friction;
        fixDef.restitution = shapeDef.fixDef.restitution;

        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

        console.log(shapeDef.config);

        bodyDef.position.x = shapeDef.config.x;
        bodyDef.position.y = shapeDef.config.y;

        var currentBody = world.CreateBody(bodyDef);

        if (shapeDef.shapeName === 'circle') {
            currentShape = new Kinetic.Circle(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'ellipse') {
            currentShape = new Kinetic.Ellipse(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'image') {
            currentShape = new Kinetic.Image(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'line') {
            currentShape = new Kinetic.Line(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'path') {
            currentShape = new Kinetic.Path(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'polygon') {
            currentShape = new Kinetic.Polygon(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'rect') {
            currentShape = new Kinetic.Rect(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
            fixDef.shape.SetAsBox((shapeDef.config.width / 2) / scale, (shapeDef.config.height / 2) / scale);
            currentShape.setOffset(shapeDef.config.width / 2, shapeDef.config.height / 2);
        } else if (shapeDef.shapeName === 'regularPolygon') {
            currentShape = new Kinetic.RegularPolygon(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'sprite') {
            currentShape = new Kinetic.Sprite(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'star') {
            currentShape = new Kinetic.Star(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'text') {
            currentShape = new Kinetic.Text(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'textPath') {
            currentShape = new Kinetic.TextPath(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else if (shapeDef.shapeName === 'wedge') {
            currentShape = new Kinetic.Wedge(shapeDef.config);
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(shapeDef.config.radius / scale);
        } else {
            throw "Unknown shape: " + shapeDef.shapeName;
        }

        currentShape.on('dragstart touchstart', B2dK.prototype.shapeDragstart);
        currentShape.on('dragend touchend',     B2dK.prototype.shapeDragend);
        currentShape.on('dragmove touchmove',   B2dK.prototype.shapeDragmove);

        currentBody.CreateFixture(fixDef);

        return new B2dK(currentShape, currentBody);
    }


    // B2dK is the class that binds Box2d and Kinetic classes together
    function B2dK(shape, body){

        shape.body = body;

        body.SetUserData({
            shape: shape
            , dragged: false
            , mouseJoint: null
            , dragX: null
            , dragY: null
        });

        this.shape = shape;
        this.body  = body;
    }

    B2dK.prototype.body  = null;
    B2dK.prototype.shape = null;

    B2dK.prototype.shapeDragstart = function(e) {
        var userData = this.body.GetUserData();

        if(userData.dragged === false) {

            userData.dragged = true;
            this.attrs.dragged = true;

            userData.dragX = e.layerX / scale;
            userData.dragY = e.layerY / scale;

            var md = new Box2D.Dynamics.Joints.b2MouseJointDef();
            md.bodyA = world.GetGroundBody();
            md.bodyB = this.body;
            md.target.Set(userData.dragX, userData.dragY);
            md.collideConnected = true;
            md.maxForce = 8000.0 * this.body.GetMass();
            userData.mouseJoint = world.CreateJoint(md);
            this.body.SetAwake(true);

            this.setFill('blue');

            this.body.SetUserData(userData);

        }
    }

    B2dK.prototype.shapeDragend = function(e) {

        var userData = this.body.GetUserData();
        userData.dragged = false;
        this.attrs.dragged = false;

        world.DestroyJoint(userData.mouseJoint);
        userData.mouseJoint = null;
        userData.dragX = this.body.getX;
        userData.dragY = this.body.getY;

        this.setFill('red');

        this.body.SetUserData(userData);
    }

    B2dK.prototype.shapeDragmove = function(e) {

        var userData = this.body.GetUserData();

        userData.dragX = e.layerX / scale;
        userData.dragY = e.layerY / scale;

        this.body.SetUserData(userData);
    }



$(document).ready(function(){

    // Prepare Box2D world
    world = new Box2D.Dynamics.b2World(
        new Box2D.Common.Math.b2Vec2(0, 1)    //gravity
        , true                                   //allow sleep
    );

    // Prepare Kinematic stage and layer
    var stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: 1200,
        height: 300
    });

    layer = new Kinetic.Layer();
    stage.add(layer);



    // Main update function, called by Kinetic.Animation
    function update(a, b) {

        // Iterate over all bodies in he world
        // TODO: Optimize it to iterate over only B2DK objects
        var currentBody = world.GetBodyList();
        var currentUserData;

        while (currentBody !== null) {

            if ( (currentUserData = currentBody.GetUserData()) !== null) {

                // TODO: check if it is a B2DK object
                if (true) {
                    if( currentUserData.dragged === true ) {
                        // Move the body onto the dragged Kinematic shape position
                        currentUserData.mouseJoint.SetTarget(new Box2D.Common.Math.b2Vec2(currentUserData.dragX, currentUserData.dragY));
                    }

                    if (currentUserData.shape !== undefined) {

                        // Position and rotate the Kinematic shape onto the body
                        var wp = currentBody.GetWorldPoint({x:0, y:0});
                        currentUserData.shape.setY(wp.y * scale);
                        currentUserData.shape.setX(wp.x * scale);
                        currentUserData.shape.setRotation(currentBody.GetAngle());
                    };
                };

            }
            currentBody = currentBody.GetNext();
        }

        world.Step(1 / fps, 10, 10);

        if (debug === true) {
            world.DrawDebugData();
        }

        world.ClearForces();

    }

    // setup debug draw
    if (debug === true) {
        var debugDraw = new Box2D.Dynamics.b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
        debugDraw.SetDrawScale(scale);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
    }


    var anim = new Kinetic.Animation(function(frame) {
        update(layer, frame);
    }, layer);

    anim.start();

});
