frappe.provide("templates/includes");
frappe.provide("frappe");
{% include "templates/includes/inherit.js" %}
{% include "templates/includes/utils.js" %}
// {% include "templates/includes/form_generator.js" %}
{% include "templates/includes/list.js" %}
{% include "templates/includes/event.js" %}
{% include "templates/includes/visit.js" %}
{% include "templates/includes/list_view.js" %}
{% include "templates/includes/profile.js" %}
{% include "templates/includes/linked_phr.js" %}
{% include "templates/includes/provider.js" %}
{% include "templates/includes/medication.js" %}
{% include "templates/includes/appointments.js" %}
{% include "templates/includes/messages.js" %}
{% include "templates/includes/disease_monitoring.js" %}
{% include "templates/includes/dashboard_renderer.js" %}
{% include "templates/includes/todo.js" %}
/*
  Format for method Classes
  ClassName.prototype.init(wrapper,name_of_json_file,entityid,operation_entity)
*/
$(document).ready(function () {
	//sessionStorage.setItem("cid",frappe.get_cookie('profile_id'));
	NProgress.start();
	profile_id=sessionStorage.getItem("cid")
	var db = new render_dashboard();
	db.render_providers(profile_id)
	db.render_linked_phr(profile_id)
	db.render_middle_section(profile_id)
	db.render_emer_details(profile_id)
	db.render_to_do(profile_id)
	db.render_advertisements(profile_id)
	$('#profile').attr('data-name',profile_id)
	$('#home').attr('data-name',profile_id)
	bind_events(db)
	NProgress.done();
})
function bind_events(){
	profile_id=sessionStorage.getItem("cid")
	$("#home").on("click",function(){
		$('.breadcrumb').empty()
		$('.linked-phr').empty()
		$('.save_controller').hide()
		$('.new_controller').hide()
		NProgress.start();
		profile_id=sessionStorage.getItem("pid")
		$('#linkedphr').show()
		sessionStorage.setItem("cid",profile_id)
		$('#profile').attr('data-name',profile_id)
		var db = new render_dashboard();
		$('.field-area').empty()
		$('#main-con').empty()
		db.render_providers(profile_id)
		db.render_linked_phr(profile_id)
		db.render_middle_section(profile_id)
		NProgress.done();
	})
	$("#profile").unbind("click").click(function(){
		profile_id=sessionStorage.getItem("cid")
		$('.breadcrumb').empty()
		PatientDashboard.prototype.init($(document).find("#main-con"),
				{"file_name" : "profile", "method": "profile"},profile_id)
	})
	$('.event').unbind("click").click(function(){
		profile_id=sessionStorage.getItem("cid")
		$('.breadcrumb').empty()
		$('<li><a nohref>Event</a></li>').click(function(){
			$('.breadcrumb li').nextAll().remove()
			Events.prototype.init('', '', profile_id)
		}).appendTo('.breadcrumb');
		window.Events.prototype.init('', '', profile_id)
	})
	$('.visit').unbind("click").click(function(){
		$('.breadcrumb').empty()
		$('<li><a nohref>Visit</a></li>').click(function(){
			$('.breadcrumb li').nextAll().remove()
			Visit.prototype.init('', '', sessionStorage.getItem("cid"))
		}).appendTo('.breadcrumb');
		Visit.prototype.init('', '', sessionStorage.getItem("cid"))
	})
	$('.medications').unbind("click").click(function(){
		$('.breadcrumb').empty()
		$('<li><a nohref>Medications</a></li>').click(function(){
			$('.breadcrumb li').nextAll().remove()
			Medications.prototype.init($(document).find("#main-con"), '', sessionStorage.getItem("cid"))
		}).appendTo('.breadcrumb');
		Medications.prototype.init($(document).find("#main-con"),'', sessionStorage.getItem("cid"))
	})
	$('.dmonit').unbind("click").click(function(){
		$('.breadcrumb').empty()
		$('<li><a nohref>Disease Monitoring</a></li>').click(function(){
			$('.breadcrumb li').nextAll().remove()
			DiseaseMonitoring.prototype.init($(document).find("#main-con"), '', sessionStorage.getItem("cid"))
		}).appendTo('.breadcrumb');
		DiseaseMonitoring.prototype.init($(document).find("#main-con"),'', sessionStorage.getItem("cid"))
	})
	$('.appoint').unbind("click").click(function(){
		$('.breadcrumb').empty()
		$('<li><a nohref>Appointments</a></li>').click(function(){
			$('.breadcrumb li').nextAll().remove()
			Appointments.prototype.init($(document).find("#main-con"), '', sessionStorage.getItem("cid"))
		}).appendTo('.breadcrumb');
		Appointments.prototype.init($(document).find("#main-con"),'', sessionStorage.getItem("cid"))
	})
	$('.msg').unbind("click").click(function(){
		$('.breadcrumb').empty()
		$('<li><a nohref>Messages</a></li>').click(function(){
			$('.breadcrumb li').nextAll().remove()
			Messages.prototype.init($(document).find("#main-con"), '', sessionStorage.getItem("cid"))
		}).appendTo('.breadcrumb');
		Messages.prototype.init($(document).find("#main-con"),'', sessionStorage.getItem("cid"))
	})
	$('.create_linkphr').unbind("click").click(function(){
		$('.breadcrumb').empty()
		$('<li><a nohref>Linked PHR</a></li>').click(function(){
			LinkedPHR.prototype.init($(document).find("#main-con"),
			{"file_name" : "linked_patient"},"","create_linkphr")
		}).appendTo('.breadcrumb');
		LinkedPHR.prototype.init($(document).find("#main-con"),
			{"file_name" : "linked_patient"},"","create_linkphr")
	})
	$(".create_provider").unbind("click").click(function(){
		$('.breadcrumb').empty()
		$('<li><a nohref>Provider</a></li>').click(function(){
			Provider.prototype.init($(document).find("#main-con"),
				{"file_name" : "provider"},"","create_provider")
		}).appendTo('.breadcrumb');
		Provider.prototype.init($(document).find("#main-con"),
				{"file_name" : "provider"},"","create_provider")
	})
	$(".create_todo").unbind("click").click(function(){
		ToDo.prototype.init($(document).find("#main-con"),
			{"cmd":"make_todo"},profile_id,"")	
	})
	
}

