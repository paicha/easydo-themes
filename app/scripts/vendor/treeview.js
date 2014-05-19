(function(){define("nav_node_view",["underscore","marionette"],function(e,t){return t.CompositeView.extend({template:e.template('<li>\n  <{{ ((id=="null") ? "div": "a") }} class="node-a-{{ id }}" href="#">\n    <div class="node">\n      <span class="toggle-icon fa {{ is_folder? "fa-plus" : "hidden" }}" ></span>\n      <label class="{{ (checkable ? "" : "hidden") }}">\n      <input id="checkbox-{{ id }}" type="checkbox" class="node-checkbox">\n      </label>\n      <span class="{{ icon }}"></span>{{ nodeName }}\n    </div>\n  </{{ ((id=="null") ? "div": "a") }}>\n  </li>'),tagName:"ul",initialize:function(e){return this.collection=this.model.nodes,this.controller=e.controller,this.controller.nodeList[this.model.id]=this,this.on("click:toggle",this._onToggle),this.on("click:checkbox",this._clickCheckbox),this.on("click:node",this._clickNode)},_clickCheckbox:function(e){var t,n;return n=e.model.get("nodeName"),t=$("#checkbox-"+e.model.get("id")).prop("checked"),t?this.controller.checkedNode[n]=e.view:delete this.controller.checkedNode[n]},_clickNode:function(e){return this.activate(),this.controller.trigger("clicknode",e.view)},_onToggle:function(e){return this.isExpanded()?this.collapse():this.expand()},triggers:{"click .toggle-icon":"click:toggle","click a":"click:node","click .node-checkbox":{event:"click:checkbox",preventDefault:!1,stopPropagation:!0}},load_nodes:function(e){this.collection.add(e);if(this.on_loaded)return this.on_loaded(this),this.on_loaded=null},serializeData:function(){var e;return e=this.model.get("checkable"),typeof e=="undefined"&&(e=this.controller.checkable),{id:this.model.get("id"),icon:this.model.get("icon"),nodeName:this.model.get("nodeName"),is_folder:this.model.get("is_folder"),checkable:e}},itemViewOptions:function(){return{controller:this.controller}},appendHtml:function(e,t){return e.$("li:first").append(t.el)},isExpanded:function(){return $(this.el).find("span").first().attr("class").indexOf("plus")<=-1},expand:function(e){return this.collection.length?e&&e(this):(this.on_loaded=e,!this.controller.is_static&&this.model.get("is_folder")?this.controller.trigger("load",this,this.model):e&&e(this)),$(this.el).find("span").first().addClass("fa-minus").removeClass("fa-plus"),$(this.el).children().children().filter("ul").show("fast")},collapse:function(){return $(this.el).find("span").first().addClass("fa-plus").removeClass("fa-minus"),$(this.el).children().children().filter("ul").hide("fast")},activate:function(){var e,t;t=this.controller.currentNode,t&&(t=t.model.get("id")),e=this.model.get("id");if(t!==e)return $(".navtree .node-a-"+t).find("div").removeClass("node-active"),$(this.el).find(".node").first().addClass("node-active"),this.controller.currentNode=this}})}),define("nav_root_view",["underscore","marionette","nav_node_view"],function(e,t,n){return t.CollectionView.extend({initialize:function(e){return this.controller=e.controller},className:"navtree",itemView:n,itemViewOptions:function(){return{controller:this.controller}},collapse:function(){return $(this.el).find("li > ul").hide()},loadCss:function(e){var t;return t=document.createElement("link"),t.type="text/css",t.rel="stylesheet",t.href=e,document.getElementsByTagName("head")[0].appendChild(t)}})}),define("tree_node_model",["underscore","backbone"],function(e,t){return t.Model.extend({initialize:function(){var e,t;t=this.get("nodes");if(t)return e=require("tree_node_collection"),this.nodes=new e(t),this.unset("nodes")}})}),define("tree_node_collection",["underscore","backbone","tree_node_model"],function(e,t,n){return t.Collection.extend({model:n})}),define("treeview",["underscore","marionette","backbone","nav_root_view","tree_node_collection"],function(e,t,n,r,i){var s;return s=t.Controller.extend({initialize:function(e){return this.checkable=e.checkable,this.css=e.css,this.is_static=e.is_static,this.treeView=new r({collection:new i,controller:this}),this.treeView.loadCss(this.css),this.checkedNode={},this.nodeList={}},load_nodes:function(e){this.treeView.collection.add(e),this.treeView.collapse(this);if(this.loaded_callback)return this.loaded_callback(this),this.loaded_callback=null},render:function(e){return this.treeView.render(),$(e).html(this.treeView.el)},get_checked:function(){return this.checkedNode},get_activated:function(){return this.currentNode},get_node:function(e){return this.nodeList[e]},_onGotNode:function(t){var n,r,i;return this.node_ids.length?(r=this.that,i=e.bind(r._onGotNode,{on_loaded:this.on_loaded,that:r,node_ids:this.node_ids.slice(1)}),n=r.get_node(this.node_ids[0]),n.expand(i)):this.on_loaded(t)},get_node_by_path:function(t,n){var r;return r=e.bind(this._onGotNode,{on_loaded:n,that:this,node_ids:t}),this.treeView.collection.length?r(this):this.loaded_callback=r}})})})();