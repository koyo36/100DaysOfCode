/*
    A view object contains a render method which renders questions based upon
    each type of question received.

    A question consists of a label, an answer type ( choice or text entry ),
    and an optimal list of choices.

    If the answer type is Answer. Choice, a dropdown is created with the options provided

    If the answer is AnswerType.Input, a simple text input is rendered


*/


var AnswerType = {
    Choice: 0,
    Input: 1
}

function question( label, answerType, choices )
{
    return {
        label: label,
        answerType: answerType,
        choices: choices
    }
}

var view = ( function() {
    function renderQuestion( target, question )
    {
        var questionWrapper = document.createElement('div');
        questionWrapper.className = 'question';

        var questionLabel = document.createElement('div');
        questionLable.className = 'question-label';

        var label = document.createTextNode('question.label');
        questionLabel.appendChild(label);

        var answer = document.createElement('div');
        answer.className = 'question-input';

        if( question.answerType === AnswerType.Choice )
        {
            var input = document.createElement('select');
            var len = question.choices.length;

            for( var i = 0; i < len; i++ ) {
                var option = document.createElement('option');
                option.text = question.choices[i];
                option.value = question.choices[i];
                input.appendChild(option);
            }
        }
        else if( question.answerType === AnswerType.Input )
        {
            var input = document.createElement('input');
            input.type = 'text';
        }

        answer.appendChild(input);
        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);
        target.appendChild(questionWrapper);
    }

    return {
        render: function( target, options ) {
            for ( var i = 0; i < questions.length; i++ )
            {
                renderQuestion(target, questions[i]);
            };
        }
    }
} )();

var questions = [
    question('Have you used tobacco products within the last 30 days?', AnswerType.Choice, ['Yes', 'No']),
    question('What medications are you currently using?',AnswerType.Input)
];

var questionRegion = document.getElementById('questions');
view.render(questionRegion, questions);


// OPEN/CLOSED PRINCIPLE

function questionCreator( spec, my )
{
    var that = {};

    my = my || {};
    my.label = spec.label;

    my.renderInput = function() {
        throw 'not implemented';
    }

    that.render = function(target)
    {
        var questionWrapper = document.createElement('div');
        questionWrapper.className = 'question';

        var questionLabel = document.createElement('div');
        questionLabel.className = 'question-label';
        var label = document.createTextNode(spec.label);
        questionLabel.appendChild(label);

        var answer = my.renderInput();

        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);

        return questionWrapper;
    }

    return that;
}

function choiceQuestionCreator( spec )
{
    var my = {},
        that = questionCreator( spec, my );

    my.renderInput = function() {
        var input = document.createElement('select');
        var len = spec.choices.length;

        for( var i = 0; i < len; i++ )
        {
            var option = document.createElement('option');
            option.text = spec.choices[i];
            option.value = spec.choices[i];
            input.appendChild(option);
        }
        return input;
    }
    return that;
}

function inputQuestionCreator( spec )
{
    var my = {},
        that = questionCreator(spec, my);

    my.renderInput = function()
    {
        var input = document.createElement('input');
        input.type = 'text';
        return input;
    }
    return that;
}

var view = {
    render: function( target, questions ) {
        for ( var i = 0; i < questions.length; i++ ) {
            target.appendChild(questions[i].render());
        }
    }
}

var questions = [
    choiceQuestionCreator({
        label: 'Have you used tobacco product within the last 30 days?'.
        choices: ['Yes', 'No']
    }),
    inputQuestionCreator({
        label: 'What medications are you currently using?'
    })
];

var questionRegion = document.getElemenyById('questions');

view.render( questionRegion, questions );

/*
    We've factored out the code responsible for creating questions into a functional
    construcot named questionCreator.
    This constructor utilizes the Template Method Pattern for delegating the
    creation of each answer to extending types.

    We've replaced the use of the former constructor's properties with a private
    spec property which serves as the questionCreator constructor's interface
    Since we're encapsulating the rendering behavior with the data it operates upon,
    we no loner need these properties to be publicly accessible.

    We've identified the code which creates each answer type as family of algorithms
    and factored out each algorihm into a separate object (a techinque referred to as the
    Strategy Pattern ) which extends the questionCreator object using differental inheritance

    As an added benefit to this refactoring we were able to eleminate the need for
    AnswerType enumeration and we were able to make the choices array a requirement
    specific to the choiceQuestionCreator interface
*/
