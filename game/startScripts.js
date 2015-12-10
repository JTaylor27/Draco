A3D.config = {
  game:{
    forceResolution: true,
    targetRes : [640,480],
    startScene : 'level1'
  },
  scenes : {
    level1 : {
      rootUrl : './scenes/',
      file : 'level1.babylon',
      onload : function(){
        A3D.ActiveGame.mainScene.player.hasStick = false;
        A3D.ActiveGame.mainScene.player.hasSsaw = false;
        A3D.myGameFunctions = {
          logtrig : function(){
            if(A3D.ActiveGame.mainScene.player.hasStick){
              var logPatrol={
                speed: 0.02,
                patrolPoints : [
                  {
                    gotoPoint:{x:0.9232,y:0.1315,z:0.1474},
                    //  gotoPoint:{x:4,y:1,z:4},

                    lookTo:false
                  }
                ]
              }
              A3D.ActiveGame.mainScene.Actor.log.makePatrol(logPatrol);
              A3D.ActiveGame.mainScene.Actor.log.startPatrol();
              console.log('If I can knock over these logs...');
               A3D.ActiveGame.mainScene.player.hasStick = false;
          } else {
            console.log('I need a stick to move theses logs');
          }

          },
           enemytrig : function(){
             console.log('Now I can use the saw');
              A3D.ActiveGame.mainScene.player.hasSsaw = true;
           },
           walltrig : function(){
             if( A3D.ActiveGame.mainScene.player.hasSsaw){
               console.log("It's open");
               A3D.ActiveGame.mainScene.player.hasSsaw = false;
               A3D.ActiveGame.mainScene.Actor.Barricade.setLocation({x:800,y:800,z:800});
             } else {
               console.log('I need something to get past the wood');
             }


           },
           sticktrig : function(){
             console.log('I can use this to push the log');
             A3D.ActiveGame.mainScene.player.hasStick = true;
             A3D.ActiveGame.mainScene.Actor.stick.setLocation({x:800,y:800,z:800});
           }

        };

/*

        var triggers = A3D.ActiveGame.mainScene.Trigger
        console.log(triggers);

        A3D.ActiveGame.myFunction = function(){
          console.log(this);
          console.log('YOu just ran into '+this.name)
        }

        for(var o in triggers){
          triggers[o].setupActivateAction.func =
          A3D.ActiveGame.myFunction.bind(triggers[o])
        }

*/

        var patrol = [];
        patrol.push({
          speed: 0.02,
          patrolPoints : [
            {
              gotoPoint:{x:4,y:0,z:-4.5},
              lookTo:true
            },
            {
              gotoPoint:{x:1,y:0,z:-1.1},
              lookTo:true
            },
            {
              gotoPoint:{x:7,y:0,z:-2.4},
              lookTo:true
            }
          ]
        });

        patrol.push({
          speed: 0.02,
          patrolPoints : [
            {
              gotoPoint:{x:-2,y:0,z:-2},
              lookTo:true
            },
            {
              gotoPoint:{x:-4,y:0,z:4.4},
              lookTo:true
            },
            {
              gotoPoint:{x:-0.4,y:0,z:0.2},
              lookTo:true
            }
          ]
        });
        patrol.push({
          speed: 0.02,
          patrolPoints : [
            {
              gotoPoint:{x:-4,y:0,z:-1},
              lookTo:true
            },
            {
              gotoPoint:{x:2,y:0,z:-5.4},
              lookTo:true
            },
            {
              gotoPoint:{x:-5,y:0,z:-4.3},
              lookTo:true
            }
          ]
        });
        var i = 0;
        for(var e in A3D.ActiveGame.mainScene.Enemy){
          console.log(e);
          if(e != 'boss'){
            var me = A3D.ActiveGame.mainScene.Enemy[e];
            me.makePatrol(patrol[i]);
            me.startPatrol();
            i++;
          }
        }
        A3D.ActiveGame.runOnAssetsLoaded();
      }
    }
  },
    playerSetup : {
      rootUrl : './models/',
      file : 'dracobones.babylon',
      name : 'Draco',
      importMeshName:'Draco',
      startSpawn : 'spawn',
      boundsSize : {
        x : .45,
        y: .45,
        z : .45
      },
      boundsOffset : {
        x : 0,
        y: .9,
        z: 0
      },
      scale : {
        x: 0.3,
        y:0.3,
        z:0.3
      },
      animationsMap : [
        {
          name : 'idle',
          start : 29,
          end : 30
        },
        {
          name : 'running',
          start : 1,
          end : 40
        },
        {
          name : 'walking',
          start : 10,
          end : 40
        }
      ],
      speedAnimationMap : [
        {
          animation : 'idle',
          targetDistance : null,
          speed: 0
        },
        {
          animation : 'walking',
          targetDistance : 0,
          speed : 0.01
        },
        {
          animation : 'running',
          targetDistance : 1,
          speed : 0.025
        }
      ]
    },
    screenImages : [
      {
        src:'/images/start.png',
        id : 'mainScreen'
      },
      {
        src:'/images/lose.png',
        id : 'loseScreen'
      },
      {
        src:'/images/win.png',
        id : 'winScreen'
      }
    ],

    targetSetup : {
      rootUrl : './models/',
      file : 'gototarget1.babylon',
      animationsSetup : [
        {
          name : 'active',
          start: 0,
          end : 100
        }
      ],
      scale : {
        x: 0.3,
        y:0.3,
        z:0.3
      }
    },

    cameraSetup : {
      offset: {
        x:0,
        y: 6,
        z: -3
      },
      rotation : {
        x: 1.09,
        y:0,
        z:0
      }
    }
  };


function start(){
  new A3D.Game();
}

document.addEventListener( "DOMContentLoaded", start, false );
