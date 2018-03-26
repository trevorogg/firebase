$(document).ready(function(){

	var trainInfo = new Firebase("https://trainschedule-bc9d8.firebaseio.com/");

    $('#addTrain').on('click', function(){

        event.preventDefault();

        var train = $('#train').val().trim();
        var line = $('#line').val().trim();
        var destination = $('#destination').val().trim();
        var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequency = $('#frequency').val().trim();

        var newTrain = {
            name: train,
            line: line,
            time: firstTrain,
            destination: destination,
            frequency: frequency
        }

        // push new train object to firebase
        trainInfo.push(newTrain);

        // clear input fields
        $('#train').val('');
        $('#line').val('');
        $('#destination').val('');
        $('#firstTrain').val('');
        $('#frequency').val('');

    });
    
    trainInfo.on('child_added', function(childSnapshot, prevChildKey){

        var fireName = childSnapshot.val().name;
        var fireLine = childSnapshot.val().line;
        var fireDestination = childSnapshot.val().destination;
        var fireTime = childSnapshot.val().time;
        var fireFrequency = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(fireTime), "minutes");
		var timeRemainder = moment().diff(moment.unix(fireTime), "minutes") % fireFrequency ;
        var minutesAway = fireFrequency - timeRemainder;
        
        var nextTrain = moment().add(minutesAway, "m").format("hh:mm A"); 

        $('#trains > tbody').append('<tr><td>' + fireName + '</td><td>' + fireLine + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway +  '</td></tr>');

    });


});