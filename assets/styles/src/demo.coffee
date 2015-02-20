angular.module('DemoApp', ['ratings'])
	.controller('DemoCtrl', ($scope)->
		$scope.id = 1
		$scope.user_rating = 3
		$scope.avg_rating = 4
		
		$scope.items = [
			{id:1,name:'Bananas',avg_rating:'2.5'}
			{id:2,name:'Strawberries',avg_rating:'1.5'}
			{id:3,name:'Grapefruits',avg_rating:'4.0'}
		]
		$scope.user_ratings={
			'1':4
			'3':2
		}
		
	)