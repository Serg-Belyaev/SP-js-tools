//Обертка к методу веб-сервиса GetListItems
function getSPListItems(listName, queryString, serviceURL,itemsLimitPerReq) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST',serviceURL, false);
	strXML = "<?xml version='1.0' encoding='utf-8'?>"+
	"<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://schemas.xmlsoap.org/soap/envelope/'>"+
	  "<soap12:Body>"+
	   "<GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>"+
	      "<listName>"+ listName +"</listName>"+
	       "<query>"+
			"<Query>"+
                queryString+
			"</Query>"+
	      "</query>"+
	      "<viewFields>"+
			"<ViewFields>"+
			    "<FieldRef Name='ID'/>"+
                "<FieldRef Name='Title'/>"+
                "<FieldRef Name='Modified'/>"+
                "<FieldRef Name='ModifiedBy'/>"+
                "<FieldRef Name='Editor'/>"+
                "<FieldRef Name='Created'/>"+
                "<FieldRef Name='ContentType'/>"+
                "<FieldRef Name='FSObjType'/>"+
                "<FieldRef Name='FileLeafRef'/>"+
                "<FieldRef Name='DocIcon'/>"+
                "<FieldRef Name='ContentTypeId'/>"+
			"</ViewFields>"+
		   "</viewFields>"+
           "<rowLimit>"+
                itemsLimitPerReq+
           "</rowLimit>"+
           "<queryOptions>"+
		   	"<QueryOptions>"+
		   		"<ViewAttributes Scope='RecursiveAll'></ViewAttributes>"+
			"</QueryOptions>"+
           "</queryOptions>"+
	    "</GetListItems>"+
	  "</soap12:Body>"+
	"</soap12:Envelope>";
    xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=\"utf-8\"');
    xmlhttp.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/GetListItems');
    
	xmlhttp.send(strXML);
	if(xmlhttp.status == 200) {
        var response = xmlhttp.responseText ;
		xmlDoc = $.parseXML(response);
		$xml = $( xmlDoc );
		return $xml.find("z\\:row, row"); //эта нужно для разных браузеров, вроде бы Хром ищет по row, а остальные по z\\:row.
    } else {
        console.log("Ошибка обращения к веб-сервису");
        console.log("Код статуса: "+ xmlhttp.status);
        console.log("Ответ: " + xmlhttp.responseText);
    }

}
