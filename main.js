const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
var room = cable.subscriptions.create({channel:'TestChannel', room:$('#store_code').val()}, {
  connected() {
    console.log('TestChannel channel connected..')
  },
  disconnected() {
    console.log('TestChannel channel disconnected..')
  },
  received(data) {
    $('#messages').append(data['message']);
  }
});

$(document).ready(function(){
  $('#store_code').change(function(){
    room.unsubscribe();
    room = cable.subscriptions.create({channel: 'TestChannel', room: $('#store_code').val()},{
      received: function(data){
        $('#messages').append(data['message']);
      }
    });
  });
});
