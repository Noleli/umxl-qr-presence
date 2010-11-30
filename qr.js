$(document).ready(load);

function load()
{	
	var room = $("#room");
	var xml = $("<sighting><who><core><device-id>Ekahau.00:0B:6C:20:08:B0</device-id><user>user1@test.eecs.umich.edu</user></core></who><where><core><building>CSE</building><floor>4</floor><room>4C91</room><confidence>0.923</confidence><geo><latitude>-83.716574664248</latitude><longitude>42.29431090862</longitude><altitude>268.0</altitude></geo><accuracy>5</accuracy></core><ekahau><map-coordinates><x>945.08</x><y>1435.26</y></map-coordinates></ekahau></where><when><core><timestamp>1146254882</timestamp><localtime><year>2006</year><month>4</month><day>28</day><weekday>6</weekday><hour>16</hour><minute>8</minute><second>2</second><week-of-year>17</week-of-year><week-of-month>5</week-of-month><day-of-week-in-month>4</day-of-week-in-month><day-of-year>118</day-of-year><timezone>EDT</timezone></localtime><gmtime><year>2006</year><month>4</month><day>28</day><weekday>6</weekday><hour>20</hour><minute>8</minute><second>2</second><week-of-year>17</week-of-year><week-of-month>5</week-of-month><day-of-week-in-month>4</day-of-week-in-month><day-of-year>118</day-of-year><timezone>GMT</timezone></gmtime><expires>1146254892</expires></core></when></sighting>");
	
	$("#login").submit(
		function()
		{
			console.log(xml.html());
			xml.find("room").text(room.val());
			xml.find("user").text($("#name").val());
			$("#dump").text(formatXml("<sighting>" + xml.html() + "</sighting>"));
			return false;
		}
	);
}

var formatXml = this.formatXml = function (xml) {
	var reg = /(>)(<)(\/*)/g;
	var wsexp = / *(.*) +\n/g;
	var contexp = /(<.+>)(.+\n)/g;
	xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
	var pad = 0;
	var formatted = '';
	var lines = xml.split('\n');
	var indent = 0;
	var lastType = 'other';
	// 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
	var transitions = {
	'single->single': 0,
	'single->closing': -1,
	'single->opening': 0,
	'single->other': 0,
	'closing->single': 0,
	'closing->closing': -1,
	'closing->opening': 0,
	'closing->other': 0,
	'opening->single': 1,
	'opening->closing': 0,
	'opening->opening': 1,
	'opening->other': 1,
	'other->single': 0,
	'other->closing': -1,
	'other->opening': 0,
	'other->other': 0
	};
	
	for (var i = 0; i < lines.length; i++) {
		var ln = lines[i];
		var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
		var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
		var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
		var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
		var fromTo = lastType + '->' + type;
		lastType = type;
		var padding = '';
		
		indent += transitions[fromTo];
		for (var j = 0; j < indent; j++) {
			padding += '\t';
		}
		if (fromTo == 'opening->closing')
			formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
		else
			formatted += padding + ln + '\n';
	}
	
	return formatted;
};