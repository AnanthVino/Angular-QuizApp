'use strict';

angular.module('docketTask', [])

    .controller('quizControllers', function ($scope, $location,$rootScope,taskQuiz) {

    	// Goto question page code

    	$scope.startQuiz = function(){
			$scope.id = 0;
			$scope.quizOver = false;
			$scope.showQuiz = true;
			$scope.reviewQuizs=false;
			$scope.index=1;
			$scope.getTaskQuestion();
		};

		// Restart task code

    	$scope.reset = function(){
			$scope.showQuiz = false;
			$scope.score = 0;
		}

		// Review question method call
			
		$scope.reviewQuiz = function(){
			$scope.reviewQuizs=true;
			$scope.getAllTaskQuestions();
		}

		// Review questions code

		$scope.getAllTaskQuestions = function() {
			var allQuizs = taskQuiz.getAllTaskQuestions();
			if(allQuizs) {
				$scope.allQuestions = allQuizs;
				for (var i=0;i<$scope.allQuestions.length;i++){
	         		$scope.optionsval=[]
					if($scope.allQuestions[i].options.indexOf($scope.useranswer[i]) != $scope.allQuestions[i].answer){
	         			$scope.optionsval.push({color:'red',value:$scope.useranswer[i]})
	          			$scope.optionsval.push({color:'green',value:$scope.allQuestions[i].options[$scope.allQuestions[i].answer]})
	       			 }
	       			if($scope.allQuestions[i].options.indexOf($scope.useranswer[i]) == $scope.allQuestions[i].answer){
	          			$scope.optionsval.push({color:'green',value:$scope.useranswer[i]})
	        		}
	        		$scope.allQuestions[i].color=$scope.optionsval
	      		}
			}
		};

		// Review question correct and incorrect answer color apply

      	$scope.applystyle=function(color,option){
			var color =color.color;
        	for(var i =0;i<color.length;i++){
        		if(color[i].value==option){
            		return { "color":color[i].color}
				}
        	}
      	}

      	// Get Single question code 

		$scope.getTaskQuestion = function() {
			var singleQuiz = taskQuiz.getTaskQuestion($scope.id);
			if(singleQuiz) {
				$scope.question = singleQuiz.question;
				$scope.options = singleQuiz.options;
				$scope.answer = singleQuiz.answer;
				$scope.nextQuiz = true;
			} else {
				$scope.quizOver = true;
				$scope.reviewQuizs = false;
			}
		};

		// Check question option

		$scope.useranswer={};
		$scope.getAnswer = function(id) {
			if(!$('input[name=answer]:checked').length) return;
			var value = $('input[name=answer]:checked').val();
   			$scope.useranswer[$scope.id]=value;
			if(value == $scope.options[$scope.answer]) {
				$scope.score++;
			}
			$scope.nextQuiz = false;
		};

		// Goto next question

		$scope.nextQuestion = function() {
			$scope.id++;
			$scope.index++;
			$scope.getTaskQuestion();
		}

		$scope.reviewQuiz();
		$scope.reset();
    })

    // Create question factory 

    .factory('taskQuiz', function() {
		var questions = [
			{
				question: "When did India gain its Independence?",
				options: ["15th August, 1946", "15th August, 1947", "26th January, 1950", "26th January, 1947"],
				answer: 1
			},
			{
				question: "How many States does India have?",
				options: ["29", "30", "28", "27"],
				answer: 0
			},
			{
				question: "What is the name of India's National Aquatic Animal?",
				options: ["River Dolphin", "Crocodile", "Katla Fish", "Green Frog"],
				answer: 0
			},
			{
				question: "Kuchipudi is a dance associated with which state of India?",
				options: ["Mizoram", "Nagaland", "Kerala", "Andhra Pradesh"],
				answer: 3
			},
			{
				question: "Name the annual fair of Rajasthan that is famous for its camel trading event?",
				options: [ "Sonepur Mela", "Kumbha Mela", "Pushkar Mela", "Suraj Kund Mela"],
				answer: 2
			}
		];

		return {
			getTaskQuestion: function(id) {
				if(id < questions.length) {
					return questions[id];
				} else {
					return false;
				}
			},
			getAllTaskQuestions: function(){
				return questions;
			}
		};
	});
