//Foxhole API http://foxholestats.com https://github.com/clapfoot/warapi/
	var loopTime = 30;//delay between requests inseconds
	var worldWidth = '450px';//adjust display width
	var apiUrl = 'https://war-service-live.foxholeservices.com/api';//shard1 api see warapi readme for other shard urls
	//var apiUrl = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=505460';//SteamDB api for Live Player Count

    const acrithia_hexname = "AcrithiaHex"

    let region_owner={
        acrithia_swordfort:"COLONIALS",
        acrithia_heir_apparent:"WARDENS",
        acrithia_omicron:"NONE",
        acrithia_patridia:"WARDENS",
        acrithia_nereid:"COLONIALS",
        acrithia_legion:"COLONIALS",
        acrithia_thetus:"WARDENS",
        acrithia_brinehold:"COLONIALS",

    }

	$(document).ready(function () {
        function resetregion () {
            for(const polygon of document.getElementsByTagName("polygon")){
                polygon.setAttribute("style","fill: #aaaaaa"); //Hex Default Fill Colour
                polygon.setAttribute("stroke","#000000"); //Stroke Colour
                polygon.setAttribute("stroke-width","0.6"); //Width of Border
            }}
        resetregion();
        function drawhex () {
            for(const key in region_owner){
                //console.log(key)
                const polygon=document.getElementById(key)
                //console.log(polygon)
                const owner=region_owner[key]
                //console.log(owner)
                switch(owner){
                    case "COLONIALS":
                        polygon.setAttribute("style","fill: #516C4B"); 
                        break;
                    case "WARDENS":
                        polygon.setAttribute("style","fill: #245682"); 
                        break;
                    case "NONE":
                        polygon.setAttribute("style","fill: #808080ff"); 
                        break;
                    default:
                        polygon.setAttribute("style","fill: #ff0000ff"); 
                        break;
                
            }}

        }
        drawhex();

        function getdata() {
            const complete_dynamic_apiurl = apiUrl + "/worldconquest/maps/" + acrithia_hexname + "/dynamic/public"
            const complete_static_apiurl = apiUrl + "/worldconquest/maps/" + acrithia_hexname + "/static"
            const bases = [];
            const subregions = [];

            $.get(complete_dynamic_apiurl, function(report){
                //console.log(report)
                $.each(report.mapItems, function(i,item){
                    if ([45,46,47,56,57,58].includes(item.iconType)){
                        //This is a Base
                        bases.push({
                            owner:item.teamId,
                            x:item.x,
                            y:item.y,
                        })
                    }
                })
                //console.log(bases)

                $.get(complete_static_apiurl, function(report){
                //console.log(report)
                    $.each(report.mapTextItems, function(i,item){
                        if(item.mapMarkerType == "Major"){ //This is a Sub Region Name
                            subregions.push({
                                name:item.text,
                                x:item.x,
                                y:item.y,
                            })
                        }
                    })
                    //console.log(subregions)
                }) //End of Static
            //console.log(bases,subregions)
                map_base2subregions(bases, subregions);

            }) //End of Dynamic

            //console.log(bases,subregions)
        }
        getdata();

        // UP TO HERE //
        // function map_base2subregions(_bases,_subregions){
        //     let shortest_distance = 1
        //     let owner = "NONE"
        //     console.log(_bases, _subregions)
        //     for(let subregion of _subregions){
        //         console.log("xxxxxx")
        //         for(let base of _bases){
        //             const distance = Math.abs((subregion.x-base.x) + (subregion.y-base.y))
        //             if(distance < shortest_distance){
        //                 //New Shortest Distance
        //                 shortest_distance = distance
        //                 owner = base.owner
        //             }
        //         }
        //         console.log(subregion.name, "is owned by", owner)
        //     }
        // }

	});