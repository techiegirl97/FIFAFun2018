/* index.js */
//this is in JQuery form

var minHeight = 0;
$(document).ready(function()
{
	setMainTitleHeight();

	minHeight = $('#main-title-content').height();
	$('#main-title-content').height(minHeight);

	$(window).resize(function()
	{
		setMainTitleHeight();
	});

	//$('#bracket1').bracket();
        
        //$('#bracket1').bracket(sessionStorage.getItem('name'));
        //need to pass an array variable here to fill in the brackets
        //$('#bracket1, #bracket2').bracket({teams:24}).each(function(){$(this).data("bracket").zoomOut();});

        //var getTeamNames = [];
        //var getTeamNames = [{}];
        
        //bracket({"name": getTeamNames});
	//$('#bracket1').bracket(getTeamNames);
        //$('#bracket1, #bracket2').bracket({teams:64}).each(function(){$(this).data("bracket").zoomIn()});
        //$('#bracket1, #bracket2').bracket({teams:64}).each(function(){$(this).data("getTeamNames");});        
        //$_SESSION['teams'] = json_encode($getTeamNames));          
	//$('#bracket1').bracket({teams:8, horizontal:0, scale:0.50, icons:false, bgcolor:'#ffffff', rectFill:'#000000'});

	$('#bracket1').bracket(
	{
		teams:8,
		topOffset:50,
		scale:0.45,
		horizontal:0,
		height:'500px',
		icons:true,
		teamNames:
		[
			{
				name:'Uruguay'
			},
			{
				name:'France'
			},
			{
				name:'Brazil'
			},
			{
				name:'Belgium'
			},
			{
				name:'Sweden'
			},
			{
				name:'England'
			},
			{
				name:'Russia'
			},
			{
				name:'Croatia'
			}
		]
	}).zoomOut();

	/*var theBracket = $('#bracket2').bracket({teams:6, height:'590px'});
	theBracket.data("bracket").setVertical().zoomIn(0.6).setTeams(
	[
		{
			name:'Texas',
			seed:'5'
		},
		{
			name:'Kansas',
			seed:'4'
		},
		{
			name:'Kansas State',
			seed:'1'
		},
		{
			name:'Baylor',
			seed:'6'
		},
		{
			name:'Texas Tech',
			seed:'3'
		},
		{
			name:'TCU',
			seed:'2'
		}
	]);*/

	//$('#bracket3, #bracket4').bracket({teams:8});

	/*$('#bracket1').bracket({teamNames:[{name:'Stanford',seed:'1'}, {name:'California',seed:'2'}]});
	$('#bracket2').bracket({teams:64});*/

	//$('#bracket1, #bracket2').bracket({teams:64}).each(function(){$(this).data("bracket").zoomIn()});

	//$('#bracket1').bracket({teams:4, horizontal:0}).data("bracket").zoomIn(0.5, function(){$('#bracket2').bracket({horizontal:0, scale:0.5, teams:4}).data("bracket").setHorizontal(function(){alert('all done');});});
});

function setMainTitleHeight()
{
	var windowHeight = $(window).height();
	if (windowHeight > minHeight)
	{
		$('#main-title').height(windowHeight);
		$('#main-title-content').css({'margin-top':(($('#main-title').height() - $('#main-title-content').height()) / 2) + 'px'
		});
	}
	else $('#main-title').height(minHeight);
}