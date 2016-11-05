import math
import matplotlib.pyplot as plt

def getLength(lat1, lon1, lat2, lon2):
    return math.sqrt(math.pow(lat1-lat2,2)+math.pow(lon1-lon2,2));

def newTreshPoint(lat1, lon1, lat2, lon2,Tresh_m):
	length = getLength(lat1, lon1, lat2, lon2);
	
	nLat = (lat2-lat1)*Tresh_m/length + lat1; 
	nLon = (lon2-lon1)*Tresh_m/length + lon1;
	return(nLat,nLon);

def beizerCurve(p0x, p0y, p1x, p1y, p2x, p2y,t):
	x = math.pow(1-t,2)*p0x + 2*(1-t)*t*p1x + math.pow(t,2)*p2x;
	y = math.pow(1-t,2)*p0y + 2*(1-t)*t*p1y + math.pow(t,2)*p2y;
	return(x,y);

def getAngle(ax, ay, bx, by):
	ab_abs = getLength(ax,ay,0,0)*getLength(bx,by,0,0);
	if(ab_abs<0.001):
		return 0;
	else:
		return math.acos((ax*bx+ay*by)/ab_abs);

def findNextSharpCorner(o_Coo,CoordinatesLat_m,CoordinatesLon_m, limit):
	o_Coo_max = limit + o_Coo;
	length_Coo = len(CoordinatesLat_m);

	while(o_Coo<o_Coo_max and o_Coo<length_Coo-3):
		lat1 = CoordinatesLat_m[o_Coo];
		lon1 = CoordinatesLon_m[o_Coo];

		lat2 = CoordinatesLat_m[o_Coo+1];
		lon2 = CoordinatesLon_m[o_Coo+1];

		lat3 = CoordinatesLat_m[o_Coo+2];
		lon3 = CoordinatesLon_m[o_Coo+2];

		ax = lon1-lon2;
		ay = lat1-lat2;

		bx = lon2-lon3;
		by = lat2-lat3;

		angle = getAngle(ax,ay,bx,by);
		if(angle*180/math.pi > 45):
			return  o_Coo +1

		o_Coo=o_Coo+1;
	return -1;


Coordinates = '10.75857,59.93502,0.0 10.75903,59.93474,0.0 10.75912,59.93468,0.0 10.75919,59.93466,0.0 10.75926,59.93465,0.0 10.75913,59.93447,0.0 10.75906,59.93434,0.0 10.75907,59.9343,0.0 10.75909,59.93426,0.0 10.75916,59.93424,0.0 10.75927,59.93421,0.0 10.75942,59.93419,0.0 10.75956,59.93416,0.0 10.75959,59.93415,0.0 10.75961,59.93414,0.0 10.75963,59.9341,0.0 10.75964,59.93408,0.0 10.75963,59.93406,0.0 10.75958,59.934,0.0 10.75953,59.93395,0.0 10.75947,59.9339,0.0 10.75941,59.93386,0.0 10.7594,59.93384,0.0 10.75917,59.93349,0.0 10.75901,59.93316,0.0 10.75884,59.93287,0.0 10.7588,59.93282,0.0 10.75879,59.93281,0.0 10.75878,59.9328,0.0 10.75845,59.93293,0.0 10.75814,59.93306,0.0 10.75776,59.93319,0.0 10.75758,59.93324,0.0 10.7574,59.93328,0.0 10.75724,59.93332,0.0 10.75696,59.93337,0.0 10.75679,59.9334,0.0 10.75656,59.93344,0.0 10.75637,59.93347,0.0 10.75622,59.93349,0.0 10.75548,59.93357,0.0 10.75525,59.93359,0.0 10.75489,59.93363,0.0 10.75441,59.93367,0.0 10.75426,59.93368,0.0 10.75398,59.93372,0.0 10.75339,59.93378,0.0 10.75266,59.93384,0.0 10.75237,59.93388,0.0 10.75217,59.9339,0.0 10.75202,59.93393,0.0 10.75173,59.93397,0.0 10.75132,59.93406,0.0 10.75111,59.9341,0.0 10.75086,59.93415,0.0 10.75023,59.93431,0.0 10.74981,59.93442,0.0 10.74957,59.93448,0.0 10.74854,59.93474,0.0 10.74817,59.93482,0.0 10.74801,59.93485,0.0 10.74787,59.93488,0.0 10.74767,59.93491,0.0 10.74747,59.93494,0.0 10.74729,59.93496,0.0 10.74682,59.935,0.0 10.74669,59.93501,0.0 10.74648,59.93502,0.0 10.74551,59.93506,0.0 10.74435,59.93512,0.0 10.74417,59.93512,0.0 10.74394,59.93514,0.0 10.74375,59.93515,0.0 10.74263,59.93527,0.0 10.74068,59.93549,0.0 10.73594,59.936,0.0 10.73578,59.93602,0.0 10.73413,59.9362,0.0 10.73398,59.93621,0.0 10.73381,59.93621,0.0 10.73365,59.93621,0.0 10.7336,59.93621,0.0 10.73344,59.93621,0.0 10.73329,59.9362,0.0 10.73318,59.93619,0.0 10.73307,59.93618,0.0 10.73288,59.93615,0.0 10.7327,59.93612,0.0 10.73245,59.93606,0.0 10.73237,59.93605,0.0 10.73228,59.93602,0.0 10.7322,59.936,0.0 10.73216,59.93598,0.0 10.73189,59.93589,0.0 10.73146,59.93573,0.0 10.73096,59.93556,0.0 10.73047,59.93539,0.0 10.72993,59.93518,0.0 10.72966,59.93508,0.0 10.72912,59.93482,0.0 10.72897,59.93475,0.0 10.72869,59.93462,0.0 10.72843,59.93449,0.0 10.7279,59.93424,0.0 10.72786,59.93422,0.0 10.72771,59.93415,0.0 10.72759,59.93409,0.0 10.72751,59.93406,0.0 10.72736,59.93401,0.0 10.72707,59.93389,0.0 10.72699,59.93385,0.0 10.72697,59.93384,0.0 10.72692,59.93381,0.0 10.72676,59.93372,0.0 10.72675,59.93372,0.0 10.72655,59.93358,0.0 10.72643,59.93351,0.0 10.72636,59.93346,0.0 10.72626,59.93341,0.0 10.72609,59.93332,0.0 10.72505,59.9328,0.0 10.72452,59.93254,0.0 10.72426,59.93242,0.0 10.72419,59.93238,0.0 10.7241,59.93234,0.0 10.72408,59.93233,0.0 10.72334,59.93199,0.0 10.72288,59.9318,0.0 10.72286,59.93179,0.0 10.72282,59.93177,0.0 10.72268,59.93172,0.0 10.72245,59.93163,0.0 10.72228,59.93156,0.0 10.72176,59.93135,0.0 10.72172,59.93134,0.0 10.72131,59.93118,0.0 10.72095,59.93103,0.0 10.72077,59.93096,0.0 10.7207,59.93093,0.0 10.7206,59.9309,0.0 10.72019,59.93074,0.0 10.7198,59.93058,0.0 10.71955,59.93049,0.0 10.71914,59.93032,0.0 10.71873,59.93017,0.0 10.71868,59.93015,0.0 10.71849,59.93007,0.0 10.71757,59.92972,0.0 10.71713,59.92955,0.0 10.71676,59.92941,0.0 10.71656,59.92935,0.0 10.7164,59.92932,0.0 10.71632,59.9293,0.0 10.71624,59.92928,0.0 10.71616,59.92925,0.0 10.71609,59.92923,0.0 10.71598,59.92919,0.0 10.71561,59.92905,0.0 10.71555,59.92904,0.0 10.71552,59.92904,0.0 10.71548,59.92903,0.0 10.71541,59.92902,0.0 10.71537,59.92901,0.0 10.71532,59.929,0.0 10.71525,59.92899,0.0 10.7152,59.92898,0.0 10.71515,59.92898,0.0 10.7151,59.92898,0.0 10.71505,59.92899,0.0 10.71491,59.929,0.0 10.71474,59.92907,0.0 10.71448,59.9292,0.0 10.71429,59.92931,0.0 10.71388,59.92954,0.0 10.71383,59.92957,0.0 10.71375,59.92962,0.0 10.71318,59.93001,0.0 10.71299,59.93012,0.0 10.71282,59.93021,0.0 10.71276,59.93025,0.0 10.7127,59.93029,0.0 10.71235,59.93047,0.0 10.71203,59.93063,0.0 10.71167,59.93078,0.0 10.71129,59.93091,0.0 10.71095,59.93101,0.0 10.71036,59.93115,0.0 10.7101,59.93121,0.0 10.70991,59.93125,0.0 10.70941,59.93137,0.0 10.70902,59.93146,0.0 10.70897,59.93148,0.0';
Coordinates = Coordinates.replace(' ',',');
Coordinates = eval('['+Coordinates+']');


CoordinatesLon_m = [];
CoordinatesLat_m = [];

numberOfCoordinates = int(math.ceil(len(Coordinates)/3-0.5));
coordinatetsToMeters = 10000000/90;

for i in range(0, numberOfCoordinates):
	CoordinatesLon_m.insert(i,Coordinates[i*3] * math.cos(Coordinates[i*3+1]*math.pi/180) * coordinatetsToMeters);
	CoordinatesLat_m.insert(i,Coordinates[i*3+1] * coordinatetsToMeters);


newLat = CoordinatesLat_m;
newLon = CoordinatesLon_m;
beizerCurveData = ["p0"];

Tresh_m = 3.5; # meters

o_Coo = 0;
o_Coo_nextBigTurn = 0;
n_Coo = 0;

print(numberOfCoordinates);

print(newLat[len(newLat)-1]);
print(newLon[len(newLon)-1]);

smallAngle  = 10 *math.pi/180;
mediumAngle = 20*math.pi/180;
largeAngle = 40*math.pi/180;

removalsNotMade = False;
while removalsNotMade==False:
    newLatTemp = [newLat[0]];
    newLonTemp = [newLon[0]];
    numberOfCoordinates = math.ceil(len(newLat)-0.5);
    print(numberOfCoordinates);
    o_Coo = 0;
    diff=1;
    while o_Coo<numberOfCoordinates-3:
        new_s = len(newLatTemp)-1;
        lat1=newLatTemp[new_s];
        lon1=newLonTemp[new_s];

        lat2=newLat[o_Coo+1];
        lon2=newLon[o_Coo+1];
    
        lat3=newLat[o_Coo+2];
        lon3=newLon[o_Coo+2];

        lat4=newLat[o_Coo+3];
        lon4=newLon[o_Coo+3];

        L12 = getLength(lat1,lon1,lat2,lon2);
        L23 = getLength(lat2,lon2,lat3,lon3);
        L34 = getLength(lat2,lon2,lat3,lon3);

        o_Coo_nextBigTurn = findNextSharpCorner(o_Coo,newLat,newLon, 5,); 

        angle12_34 = getAngle(lat2-lat1,lon2-lon1, lat4-lat3, lon4-lon3);
        angle12_14 = getAngle(lat2-lat1,lon2-lon1, lat4-lat1, lon4-lon1);
        angle12_13 = getAngle(lat2-lat1,lon2-lon1, lat3-lat1, lon3-lon1);
        angle31_32 = getAngle(lat1-lat3,lon1-lon3, lat2-lat3, lon2-lon3);

        if(angle12_34<mediumAngle and L23<Tresh_m*2):
            newLatTemp.append((lat2+lat3)/2);
            newLonTemp.append((lon2+lon3)/2);
            o_Coo=o_Coo+2;
            diff=2;
            print("It happend");
            print(o_Coo);
        elif (L23<Tresh_m and o_Coo_nextBigTurn==o_Coo+2):
            newLatTemp.append(lat3);
            newLonTemp.append(lon3);
            o_Coo=o_Coo+2;
            diff=2;
            print("It happend too");
            print(o_Coo);
        elif (L12<Tresh_m and L23>Tresh_m and L34<Tresh_m):
            newLatTemp.append(lat3);
            newLonTemp.append(lon3);
            o_Coo=o_Coo+2;
            diff=2;
            print("This happend too");
            print(o_Coo);
        elif ((angle12_13<smallAngle and L23<Tresh_m) or (angle31_32<smallAngle and L12<Tresh_m) and angle12_14<largeAngle):
            newLatTemp.append(lat3);
            newLonTemp.append(lon3);
            o_Coo=o_Coo+2;
            diff=2;
            print("This happend too guys");
            print(o_Coo);
        elif (angle12_13<angle12_14 and angle12_14<largeAngle and (L12<Tresh_m*2 or L34<Tresh_m*2)):           
            nLat = (lat2+lat3)/2;
            nLon = (lon2+lon3)/2;55

            newL12 = getLength(lat1,lon1,nLat,nLon);
            newL34 = getLength(lat4,lon4,nLat,nLon);

            if(newL12<Tresh_m*2 and newL34<Tresh_m*2):
                newLatTemp.append(nLat);
                newLonTemp.append(nLon);
                print("1");
            if(L12<Tresh_m*2 and L34<Tresh_m*2):
                angle21_23 = getAngle(lat1-lat2,lon1-lon2, lat3-lat2, lon3-lon2);
                angle32_34 = getAngle(lat2-lat3,lon2-lon3, lat4-lat3, lon4-lon3);
                if(angle21_23>angle32_34):
                    newLatTemp.append(lat3);
                    newLonTemp.append(lon3);
                    print("2");
                else:
                    newLatTemp.append(lat2);
                    newLonTemp.append(lon2);
                    print("3");
            elif(L12<Tresh_m*2):
                newLatTemp.append(lat3);
                newLonTemp.append(lon3);
                print("4");
            else:
                newLatTemp.append(lat2);
                newLonTemp.append(lon2);
                print("5");
            diff=2;
            o_Coo=o_Coo+2;
            print("This happend too girls");
            print(o_Coo);
        else:
            newLatTemp.append(lat2);
            newLonTemp.append(lon2);
            o_Coo=o_Coo+1;
            diff=1;

    if(diff==1):
        newLatTemp.append(newLat[len(newLat)-2]);
        newLonTemp.append(newLon[len(newLat)-2]);

    newLatTemp.append(newLat[len(newLat)-1]);
    newLonTemp.append(newLon[len(newLat)-1]);

    newLat=newLatTemp;
    newLon=newLonTemp;

    print(newLat[len(newLat)-1]);
    print(newLon[len(newLon)-1]);

    newNumberOfCoordinates = math.ceil(len(newLat)-0.5);
    if (newNumberOfCoordinates==numberOfCoordinates):
        removalsNotMade=True;




      
numberOfCoordinates = math.ceil(len(newLat)-0.5)
print(numberOfCoordinates);
o_Coo=0;
newLatCom = [newLat[0]];
newLonCom = [newLon[0]];

while o_Coo<numberOfCoordinates-3:
    new_s = len(newLatCom)-1;

    lat1=newLatCom[new_s];
    lon1=newLonCom[new_s];

    lat2=newLat[o_Coo+1];
    lon2=newLon[o_Coo+1];
    
    lat3=newLat[o_Coo+2];
    lon3=newLon[o_Coo+2];

    lat4=newLat[o_Coo+3];
    lon4=newLon[o_Coo+3];

    L12 = getLength(lat1,lon1,lat2,lon2);
    L23 = getLength(lat2,lon2,lat3,lon3);
        
    if(beizerCurveData[new_s]=="b2"):
        L12=L12;

    if(L12>=Tresh_m and L23>=Tresh_m):
        (nLat,nLon) = newTreshPoint(lat2, lon2, lat1, lon1, Tresh_m);
        newLatCom.append(nLat);
        newLonCom.append(nLon);
        beizerCurveData.append("b0");

        newLatCom.append(lat2);
        newLonCom.append(lon2);
        beizerCurveData.append("b1");

        [nLat,nLon]= newTreshPoint(lat2, lon2, lat3, lon3, Tresh_m);
        newLatCom.append(nLat);
        newLonCom.append(nLon);
        beizerCurveData.append("b2");
        
        o_Coo=o_Coo+1;
    else:  
        newLatCom.append(lat2);
        newLonCom.append(lon2);
        beizerCurveData.append("po");

        o_Coo=o_Coo+1;


beizerLat = [];
beiserLon = [];
new_s = len(newLonCom);

(x,y)=beizerCurve(-1, -1, 0, 0, 1, 1,0.5);
print(x);
print(y);

a  = getAngle(1,0,1,1)*180/math.pi;
print(a);

i=0;
while i<new_s-3:
	if beizerCurveData[i]=="b0":
		for t in range(0,31):
			(x,y)=beizerCurve(newLatCom[i], newLonCom[i], newLatCom[i+1], newLonCom[i+1], newLatCom[i+2], newLonCom[i+2],t/30);
			beizerLat.append(x);
			beiserLon.append(y);
		i=i+2;
	else:
		beizerLat.append(newLatCom[i]);
		beiserLon.append(newLonCom[i]);

	i=i+1;


plt.plot(CoordinatesLon_m,CoordinatesLat_m)
plt.plot(beiserLon,beizerLat)
plt.show()


newLatComDeg = [];
newLonComDeg = [];

for i in range(0, new_s):
	newLatComDeg.insert(i,newLatCom[i] / coordinatetsToMeters);
	newLonComDeg.insert(i,newLonCom[i] / math.cos(newLatComDeg[i]*math.pi/180) / coordinatetsToMeters);

import csv
writer=csv.writer(open('road.csv','wb'))
i=0
length_list = len(newLatCom);


writer.writerow(['lat','lon','name','type']);
while i!=length_list :
    data=[newLatComDeg[i],newLonComDeg[i],i,beizerCurveData[i]];
    writer.writerow(data);
    i=i+1;