'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

var CouncilActions = require('actions/council-actions');
var CouncilStore = require('stores/council-store');

var Link = require('components/link');
var Text = require('components/text');
var CouncilQuestion = require('./council_question');

var getQuestions = function() {
  return CouncilStore.getQuestions();
};

module.exports = act.cl({
  displayName: 'Council',
  mixins: [CouncilStore.mixin],

  getInitialState: function() {
    CouncilActions.loadQuestions();
    return {
      questions: []
    };
  },

  storeDidChange: function() {
    this.setState({
      questions: getQuestions()
    });
  },

  buildQuestion: function(fields, index) {
    return act.el(CouncilQuestion, {
      question: index,
      index: index,
      _id: fields._id,
      prompt: fields.prompt,
      options: fields.options
    });
  },

  render: function() {

    var list = this.state.questions.length
          ? _.map(this.state.questions, this.buildQuestion)
          : act.el(Text, {
            value: 'Waiting on questions...',
            style: {
              color: 'white'
            }
          });

    return act.el(
      'div',
      {
        className: 'Council',
        style: styler({
          'max-width': '700px',
          'margin': '0 auto',
          padding: '10px',
          textAlign: 'center',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'space-around',
          'align-items': 'center'
        })
      },

      act.el(
        'top',
        {
          style: styler({
            width: '100%',
            margin: '10px 0 0',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          })
        },

        act.el('div', { // left nav icon filler
          style: {
            width: '30px',
            height: '30px'
          }
        }),

        act.el(Text, {
          style: {
            margin: '5px 0 5px',
            fontWeight: 'bold',
            fontSize: '30px'
          },
          value: 'The Council'
        }),

        act.el(Link, {
          style: {
            fontSize: '15px',
            color: '#cceaff',
            background: 'none',
            padding: 0,
            margin: 0,
            border: 'none'
          },
          to: 'ask',
          value: 'Ask'
        })
      ),

      act.el(
        'div', {
          style: {
            overflow: 'hidden',
            margin: '10px 0',
            border: '1px solid',
            borderRadius: '5px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center'
          }
        },

        act.el(Link, {
          style: {
            width: '120px',
            padding: '5px 0',
            margin: 0,
            backgroundColor: 'gray',
            border: 'none',
            borderRadius: 0,
            borderRight: '1px solid'
          },
          to: 'home',
          value: 'Recent'
        }),

        act.el(Link, {
          style: {
            width: '120px',
            padding: '5px 0',
            margin: 0,
            backgroundColor: 'white',
            borderRadius: 0,
            border: 'none'
          },
          to: 'council',
          value: 'Answer'
        })
      ),

      act.el(
        'div',
        {style: styler({width: '100%'})},
        list
      )
    );
  }
});
