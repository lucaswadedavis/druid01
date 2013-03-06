var controller={


save:function(){
	store.set(model.appName,model);
	console.log("model saved!");
	console.log(store.get(model.appName));
	},
	
load: function(){
	if (!store.get(model.appName)){
		controller.save();
		console.log("new model saved!");
		console.log(store.get(model.appName));
		}
	else {
		model=store.get(model.appName);
		console.log("model retrieved!");
		console.log(model);
		}
	}
};
