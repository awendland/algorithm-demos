angular.module('kMeansDemo', [])
	.controller('DemoCtrl', ['$scope', function ($scope) {
		// Points [height (inches), foot length (cm)]
		var points = [{x: 63.75, y: 24.2, color: 'black'},
						{x: 64, y: 24.3, color: 'black'},
						{x: 64, y: 27, color: 'black'},
						{x: 62, y: 23, color: 'black'},
						{x: 65, y: 23, color: 'black'},
						{x: 70, y: 27.9, color: 'black'},
						{x: 64, y: 25, color: 'black'},
						{x: 76, y: 27.6, color: 'black'},
						{x: 62, y: 24.3, color: 'black'},
						{x: 69, y: 28, color: 'black'},
						{x: 65, y: 24, color: 'black'},
						{x: 68, y: 27, color: 'black'},
						{x: 66, y: 25, color: 'black'},
						{x: 67, y: 26, color: 'black'},
						{x: 63, y: 25.4, color: 'black'},
						{x: 69, y: 27.5, color: 'black'},
						{x: 64, y: 25, color: 'black'},
						{x: 70, y: 26, color: 'black'},
						{x: 65, y: 26.5, color: 'black'},
						{x: 66, y: 25.2, color: 'black'},
						{x: 66, y: 27.5, color: 'black'},
						{x: 68, y: 25.8, color: 'black'},
						{x: 64, y: 28, color: 'black'},
						{x: 64, y: 27, color: 'black'},
						{x: 63, y: 23.4, color: 'black'},
						{x: 70, y: 23.5, color: 'black'},
						{x: 62, y: 27.2, color: 'black'},
						{x: 64, y: 28, color: 'black'},
						{x: 64, y: 26, color: 'black'},
						{x: 68, y: 23, color: 'black'},
						{x: 71, y: 30.4, color: 'black'},
						{x: 72, y: 31, color: 'black'},
						{x: 71.5, y: 30, color: 'black'},
						{x: 70, y: 28, color: 'black'},
						{x: 69, y: 31, color: 'black'},
						{x: 76, y: 32, color: 'black'},
						{x: 70, y: 27.5, color: 'black'},
						{x: 74, y: 32, color: 'black'},
						{x: 73, y: 32, color: 'black'},
						{x: 69, y: 28.5, color: 'black'},
						{x: 70, y: 29, color: 'black'},
						{x: 70, y: 30, color: 'black'},
						{x: 76, y: 30, color: 'black'},
						{x: 73.5, y: 31, color: 'black'},
						{x: 74, y: 30.6, color: 'black'},
						{x: 70, y: 33, color: 'black'},
						{x: 71, y: 30.4, color: 'black'},
						{x: 74, y: 30.4, color: 'black'},
						{x: 66.5, y: 33, color: 'black'},
						{x: 71, y: 31, color: 'black'},
						{x: 71, y: 30.1, color: 'black'},
						{x: 70, y: 29.4, color: 'black'},
						{x: 73, y: 29.5, color: 'black'},
						{x: 66, y: 30.7, color: 'black'},
						{x: 64, y: 28, color: 'black'},
						{x: 69, y: 29.5, color: 'black'},
						{x: 70, y: 31, color: 'black'},
						{x: 67.5, y: 29, color: 'black'},
						{x: 73, y: 29, color: 'black'},
						{x: 68, y: 28, color: 'black'},
						{x: 71, y: 29.6, color: 'black'},
						{x: 68, y: 29.5, color: 'black'},
						{x: 74, y: 29.5, color: 'black'},
						{x: 70, y: 30.5, color: 'black'},
						{x: 75, y: 31.2, color: 'black'},
						{x: 70, y: 29, color: 'black'},
						{x: 70, y: 31, color: 'black'}];
		for (var i = 0; i < points.length; i++) {
			points[i].x = (points[i].x - 60) / (77 - 60);
			points[i].y = (points[i].y - 20) / (34 - 20);
		}

		// Euclidian Distance Function
		function dist(p1, p2) {
			var dx = p2.x - p1.x,
				dy = p2.y - p1.y;
			return Math.sqrt(dx*dx + dy*dy);
		}

		// Begin k-means
		var centroids = [];
		function setupCentroids() {
			var colors = ['green', 'red', 'yellow', 'orange', 'purple'];
			for (var centroidIndex = 0; centroidIndex < 2; centroidIndex++) {
				var rndPoint = points[Math.round(Math.random() * points.length)];
				centroids[centroidIndex] = {
					x: rndPoint.x,
					y: rndPoint.y,
					color: 'blue',
					groupColor: colors[centroidIndex]
				};
			}
		}

		// Loop one
		function groupPoints() {
			for (var i = 0; i < points.length; i++) {
				var point = points[i];
				var minCentroid = centroids.reduce(function (prev, curr) {
					var curDist = dist(curr, point);
					if (curDist < prev.dist) {
						return {
							dist: curDist,
							point: curr
						};
					} else {
						return prev;
					}
				}, {dist: 1e20}).point;
				point.color = minCentroid.groupColor;
			}
		}

		// Calc new centroids
		function calcCentroids() {
			for (var i = 0; i < centroids.length; i++) {
				var groupId = centroids[i].groupColor;
				var group = points.filter(function (val) {
                    return val.color === groupId;
				});
				centroids[i] = group.reduce(function (prev, curr) {
					prev.x += curr.x / group.length;
					prev.y += curr.y / group.length;
					return prev;
				}, {x: 0, y: 0, color: centroids[i].color, groupColor: groupId});
			};
		}

		setupCentroids();
		groupPoints();
		setInterval(function () {
			$scope.$apply(function () {
				calcCentroids();
				groupPoints();
				$scope.drawPoints = points.concat(centroids);
			})
		}, 1000);

		// Create points for show
		$scope.drawPoints = points.concat(centroids);
	}])
	.directive('scatterPlot', [function () {
	    return {
	        scope: {
	            points: "="
	        },
			template: '<canvas></canvas>',
	        link: function scatterPlot_Link(scope, element, attributes) {
	        	var canvas = element.find('canvas')[0],
	        		context = canvas.getContext('2d');
	        	var width = element[0].offsetWidth,
	        		height = element[0].offsetHeight;
	        	canvas.width = width;
	        	canvas.height = height;
	        	function scatterPlot_Link_drawPoints() {
	        		// Reset
	        		context.clearRect(0, 0, width, height);
	        		// Loop over points
	        		for (var pointIndex = 0; pointIndex < scope.points.length; pointIndex++) {
	        			var point = scope.points[pointIndex];
	        			context.fillStyle = point.color;
	        			var x = Math.round(width * point.x),
	        				y = Math.round(height - height * point.y);
	        			context.fillRect(x, y, 5, 5);
	        		}
	        	}

	        	// Watch for change in point values
	        	scope.$watch('points', function (newVal, oldVal) {
	        		if (newVal !== oldVal) {
	        			scatterPlot_Link_drawPoints();
	        		}
	        	});
	        	scatterPlot_Link_drawPoints();
	        }
	    }
	}]);