
          
$(document).ready(function() {
	var setAutoComp = setTimeout("initAutoFill()",100);
});

function initAutoFill(){
        $("#lectureQuestions .fill").autocompleteArray(
        [
         
   "action control","add","administrators","ads","affordances","algorithm","algorithmic","and","anonymized","anonymous","application","architecture","around","artists","asymmetrical relationship","asynchronous","attribute","attributes","authority","backchannel","back-end engineer","banner","big data","big info","boolean","booleans","bot net","bounce rate","broadcast","browser","browsers","business person","buttons","cache","calculations","channel","click-through rate","clients","column","competitive advantage","content","controls","cookie","cross site scripting","cult","cyber security","cyberbeing","dashboards","data driven","data eye in the sky","data mined","data mining","data reporting and use","data tier","data type","data warehousing","data","database","databases","decorations","delete","denial of service","dictator's dilemma","digital","directory","dogfooding","domination","dyadic","editorial","end-user agreement","equity","experts","eye in the sky","eye tracking","features","field studies","filtering","freemium","from","front-end engineer","full-text","gamification","gatekeepers","getting underneath","global unique identifiers","graphic design","hacked","hardware","hearsay","heat map","hidden web","hierarchies","html","hub","identifier","immersed","index","indexing","info loop","infomediation","information architecture","information model","information system","information","inherits","input fidelity","interaction design","internet","intranets","investors","ip address","isolate","item","items","library","lifecycle","link","links","log data","logic","login","loops","managing","menu","model","moment of relevance","monetize","mouseover","narrowcast","navigation","net delusion","network","networks","node","not","online identity","operating system","opt in","opt out","output effectiveness","output fidelity","page area","page rank","personalization","personally identifying information","phishing","platform","popularity","presentation","processing tier","programming code","programming languages","programming","project manager","prosthesis","qualitative","quantitative","query","random numbers","record","relational database","relationships","relevancy ranking","retrieve","retweet","reverse","schema","schematics","search engine optimization (seo)","select","selling data","selling stuff","selling to businesses","sequences","sequential numbers","server","servers","simulation","six degrees of separation","social engineering","social graph","social network","software","sourcing","spider","spidering","sql injection","stop words","store","structured querying language","subscriptions","symmetrical relationship","synchronously","table","tabs","tag cloud","targeting","taxonomy","template","terms","text box","thick","thin","tiers","trolling","types","ui design","upsell","usability","user experience","user interface","value patterns","values","version 3 phenomenon","vetting","viral marketing","web information systems","web log","web site","where","wiki"     
        ], 
        {
        delay:10,
        minChars:1,
        matchSubset:1,
        autoFill:true,
        maxItemsToShow:10
        }
        );
}


   