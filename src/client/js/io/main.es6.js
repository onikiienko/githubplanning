/*jshint globalstrict: true*/
define('io/main', [
  'socketIO',
  'data/service',
  'underscore'
],
  function(io, appData, _){
    let socket = io();

    return {
      enterRoom: function(roomName, currency){
        roomName = '/' + roomName;

        socket.emit('enter', {name : roomName, currency: currency});

        socket = io(roomName);

        socket.on('ready', function(cards){
          if(!appData.selectCardsCollection.toJSON().length){
            _.each(cards, function(card){
              appData.selectCardsCollection.add(card);
            });
          }
          socket.emit('me', appData.headerModel);
        });

        socket.on('oldCardsCollection', function(collection){
          if(!appData.cardsCollection.toJSON().length){
            appData.cardsCollection.addCard(collection);
          }
        });
        socket.on('oldContributorsCollection', function(collection){
          if(!appData.contributorsCollection.toJSON().length){
            appData.contributorsCollection.addContributor(collection);
          }
        });
        socket.on('oldChatCollection', function(collection){
          if(!appData.chatCollection.toJSON().length){
            appData.chatCollection.addMessage(collection);
          }
        });

        socket.on('addContributor', function(model){
          appData.contributorsCollection.addContributor(model);
          
          let playerObject = {
            name: 'Poker'
          },
          text = model.name + ' enter room',
          message = {
            contributor: playerObject,
            text: text,
            date: new Date()
          };

          socket.emit('message', message);
        });

        socket.on('removeContributor', function(model){
          appData.contributorsCollection.removeContributor(model);

          let playerObject = {
            name: 'Poker'
          },
          text = model.name + ' left room',
          message = {
            contributor: playerObject,
            text: text,
            date: new Date()
          };

          socket.emit('message', message);
        });

        socket.on('selectCard', function(model){
          appData.cardsCollection.addCard(model);

          let playerObject = {
            name: 'Poker'
          },
          text = model.contributor.name + ' add card',
          message = {
            contributor: playerObject,
            text: text,
            date: new Date()
          };

          socket.emit('message', message);
        });

        socket.on('removeCard', function(model){
          appData.cardsCollection.removeCard(model);

          let playerObject = {
            name: 'Poker'
          },
          text = model.contributor.name + ' removed card',
          message = {
            contributor: playerObject,
            text: text,
            date: new Date()
          };

          socket.emit('message', message);
        });

        socket.on('message', function(model){
          appData.chatCollection.addMessage(model);
        });

        socket.on('allRooms', function(model){
          window.rooms = model;
        });
      },
      leaveRoom: function(socketId){
        socket.emit('leave', socketId);
      },
      sendMessage: function(model){
        socket.emit('message', model);
      },
      selectCard: function(model){
        socket.emit('selectCard', model);
      },
      removeCard: function(model){
        socket.emit('removeCard', model);
      }
    }
  }
);