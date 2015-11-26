#pragma strict

//solely item pick up colliders only

import System.Collections.Generic;

var coin:int = 0;                                                            //start from 0
public var health:int = 100;                                                 //health starts full on begining game


function OnTriggerEnter(other:Collider) {
    if(other.tag =="hp_potion" && health < 100) {                           //hp_potion = tag on helth item
        health++;                                                           //how much hp should the potion give ?
        Destroy(other.gameObject);
    }
	
    if(other.tag=="hp_potion" && health==100){
        Destroy(other.gameObject);
    }

    if(other.tag =="coin" && coin < 100) {                                //coin = tag on coins
        coin += 5;                                                          //takin that each coin gives 5 points 
        Destroy(other.gameObject);
    }
	
    if(other.tag=="coin" && coin==100){
        Destroy(other.gameObject);
    }
	                                                                      //can add item collider for ammunition pick ups..
}
