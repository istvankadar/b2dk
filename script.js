
$(document).ready(function(){

    // Start adding objects to world

    // Create desk
    var deskBorderThickness = 0.5;
    createDesk($("#kinetic-container"), deskBorderThickness);


    // Public defaults
    var defaultStrokeWidth = 8;

    // try  {

    // Create a new B2DK object
    var a = new B2dKFactory({
        shapeName: 'circle',
        config: {
            radius: 40,
            x: 5,
            y: 5,
            fill: 'red',
            stroke: 'black',
            strokeWidth: defaultStrokeWidth,
            draggable: true
        },
        fixDef: {
            density:  0.1,
            friction:  0.6,
            restitution:  0.5,
        }
    });

    // TODO: make it simpler
    // Set name to 'AAA'
    ud = a.body.GetUserData();
    ud.objName = 'AAA';
    a.body.SetUserData(ud);

    // Put on the layer
    layer.add(a.shape);

    // Create a new B2DK object
    var b = new B2dKFactory({
        shapeName: 'circle',
        config: {
            radius: 30,
            x: 8,
            y: 8,
            fill: '#00aa00',
            stroke: 'black',
            strokeWidth: defaultStrokeWidth,
            draggable: true
        },
        fixDef: {
            density:  0.1,
            friction:  0.6,
            restitution:  0.5,
        }
    });
    // TODO: make it simpler
    // Set name to 'BBB'
    ud = b.body.GetUserData();
    ud.objName = 'BBB';
    b.body.SetUserData(ud);

    // Put on the layer
    layer.add(b.shape);



    var jointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
    jointDef.bodyA = a.body;
    jointDef.bodyB = b.body;
    jointDef.anchorPoint = a.body.GetWorldCenter();
    jointDef.length = 3;

    var joint = world.CreateJoint(jointDef);

    /*
    b2RevoluteJoint* joint = (b2RevoluteJoint*)myWorld->CreateJoint(&jointDef);
    ... do stuff ...
    myWorld->DestroyJoint(joint);
    joint = NULL;
    */


    // Create a new B2DK object
    var c = new B2dKFactory({
        shapeName: 'circle',
        config: {
            radius: 30,
            x: 5,
            y: 8,
            fill: '#0000aa',
            stroke: 'black',
            strokeWidth: defaultStrokeWidth,
            draggable: true
        },
        fixDef: {
            density:  0.1,
            friction:  0.6,
            restitution:  0.5,
        }
    });

    // TODO: make it simpler
    // Set name to 'CCC'
    ud = c.body.GetUserData();
    ud.objName = 'CCC';
    c.body.SetUserData(ud);

    // Put on the layer
    layer.add(c.shape);

    // Create a new B2DK object
    var d = new B2dKFactory({
        shapeName: 'circle',
        config: {
            radius: 30,
            x: 8,
            y: 5,
            fill: '#aaaa00',
            stroke: 'black',
            strokeWidth: defaultStrokeWidth,
            draggable: true
        },
        fixDef: {
            density:  0.1,
            friction:  0.6,
            restitution:  0.5,
        }
    });

    // TODO: make it simpler
    // Set name to 'DDD'
    ud = d.body.GetUserData();
    ud.objName = 'DDD';
    d.body.SetUserData(ud);

    // Put on the layer
    layer.add(d.shape);


    // Create a new B2DK object
    var e = new B2dKFactory({
        shapeName: 'rect',
        config: {
            cornerRadius: 5,
            width: 60,
            height: 60,
            x: 12,
            y: 5,
            fill: '#aaaa00',
            stroke: 'black',
            strokeWidth: defaultStrokeWidth,
            draggable: true
        },
        fixDef: {
            density:  0.1,
            friction:  0.6,
            restitution:  0.5,
        }
    });

    // TODO: make it simpler
    // Set name to 'DDD'
    ud = e.body.GetUserData();
    ud.objName = 'EEE';
    e.body.SetUserData(ud);

    // Put on the layer
    layer.add(e.shape);



    // b = new B2dKFactory({ shapeName: 'rect', config: { radius: 1, x: 100, y, 100 }});
    // c = new B2dKFactory({ shapeName: 'circlex', config: { radius: 1 }});
    // } catch (e) {
    //    console.log(e);
    //    throw ("Execution stopped.");
    // }
});