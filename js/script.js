var app = angular.module('ToDo', ['storageService']);
app.controller('ToDoController', ['$scope', 'getLocalStorage', function($scope, getLocalStorage) {
     $scope.newTodo=getLocalStorage.getData();
    
    

     $scope.myVar = false;
    $scope.show = function() {
        $scope.myVar = true;
    };

   
    $scope.todos = getLocalStorage.getTodos();
    $scope.getTotalTodos = function () {
    return $scope.todos.length;
  };
   
//getLocalStorage.bind($scope,"newTodo");

    $scope.addTodo = function() {
        $scope.todos.push({'title': $scope.newTodo, 'done': false});
        getLocalStorage.updateTodos($scope.todos);
        $scope.newTodo = '';
        
    };
   
    
    $scope.clearCompleted = function() {
        $scope.todos = $scope.todos.filter(function(item) {
            return !item.done;
        });
        getLocalStorage.updateTodos($scope.todos);
 
    };
    $scope.change = function(){
        getLocalStorage.setData($scope.newTodo);
       
    }

}]);
app.filter('reverse', function() {
  return function(todoList) {
    return todoList.slice().reverse();
  };
});
var storageService = angular.module('storageService', []);

storageService.factory('getLocalStorage', function() {
    
	var todoList = {};
    var newTodo="";
     	
    return {


    		list: todoList,
    		
        updateTodos: function (todosArr) {
            if (window.localStorage && todosArr) {
                localStorage.setItem("todos", angular.toJson(todosArr));
            }
            //update the cached version
            todoList = todosArr;
        },
        
        getTodos: function () {
            todoList = angular.fromJson( localStorage.getItem("todos") );
            return todoList ? todoList : [];
        },

      setData: function(val) {
      window.localStorage && window.localStorage.setItem('newTodo', val);
      return this;
    },

    getData: function() {
return window.localStorage && window.localStorage.getItem('newTodo');
      }  
    };
    
});