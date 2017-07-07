angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http, $filter, contatosAPI, operadorasAPI){
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarContatos = function (){
		contatosAPI.getContatos().then(function(response){
			$scope.contatos = response.data;
		});
	};
	var carregarOperadoras = function (){
		operadorasAPI.getOperadoras().then(function(response){
			$scope.operadoras = response.data;
		});
	};
	$scope.adicionarContato = function (contato){
		contato.data = new Date();
		contatosAPI.saveContato(contato).then(function(response){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		});
	};
	$scope.apagarContatos = function(contatos) {
		$scope.contatos = contatos.filter (function(contato){
			if (!contato.selecionado) return contato;
			$http.delete("http://localhost:3412/contatos/"+contato.id).then(function(response){
				console.log(response);
				delete $scope.contato;
				$scope.contatoForm.$setPristine();
				carregarContatos();
			});
		});
	};
	$scope.isContatoSelecionado = function (contatos){
		return contatos.some(function (contato){
			return contato.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
	carregarContatos();
	carregarOperadoras();
});