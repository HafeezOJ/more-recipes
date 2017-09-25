// JavaScript Document
function GetNaira(){
	var rate=$("#rate").val();
	var amount=$("#amount").val();
	var Total;
	Total=rate * amount;
	$("#naira").val(Total);
	$("#amnaira").html("&#8358;" + currencyFormat(Total) + " for £" + amount);	
}	


function GetPounds(){
	var rate=Number($("#rate").val());
	var amount=Number($("#amount").val());
	if(rate==0)
	{
		$("#ampounds").html("<span style=\"color:red;\">Please enter rate!</span>");	
	}
	else if(amount==0)
	{
		$("#ampounds").html("<span style=\"color:red;\">Please enter anount in Naira!</span>");
	}
	else
	{
		var pounds=amount/rate;
		pounds=Math.round(pounds * 100) / 100;
		displayPounds=Number(pounds);
		displayPounds=displayPounds.toFixed(2);
		var naira=Number(amount);
		$("#ampounds").html("£" + displayPounds + " for &#8358; ");
		$("#ampounds").append(currencyFormat(naira));	
		$("#pounds").val(pounds);
	}
}	


function AmountToNaira(){
	var rate=$("#rate").val();
	var amount=$("#amount").val();
	var amountINnaira;
	amountINnaira=rate * amount;
	$("#amountNaira").val(currencyFormat(amountINnaira));
	$("#amountInPounds").html("£" + amount);
	//$("#amountInNaira").html("&#8358;" + currencyFormat(amountINnaira));
	Total();
}

function Commission(){
	var rate=$("#rate").val();
	var commission=$("#commission").val();
	var commissionInNaira;
	commissionInNaira=rate * commission;
	$("#commissionNaira").val(commissionInNaira);
	$("#CommissionPounds").html("£" + commission);
	//$("#CommissionNaira").html("&#8358;" + currencyFormat(commissionInNaira));
	Total();
}


function Total(){
	var rate=$("#rate").val();
	var amount=$("#amount").val();
	var commission=$("#commission").val();
	var amountInNaira=$("#amountNaira").val();
	var commissionInNaira=$("#commissionNaira").val();
	var TotalPounds=Number(amount) + Number(commission);
	var TotalNaira=Number(amountInNaira) + Number(commissionInNaira);
	$("#totalPounds").val(TotalPounds);
	$("#totalNaira").val(TotalNaira);
	$("#PoundsTotal").html("£" + currencyFormat(TotalPounds));
	//$("#NairaTotal").html("&#8358;" + currencyFormat(TotalNaira));	
}	

function currencyFormat(num)
{
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}


function NairaToPounds(){
	var rate=$("#rate").val();
	//var gbp=$("#gbp").val();
	//alert(rate);
	var ngn=$("#ngn").val();
	var ans;
	ans=ngn/rate;
	$("#gbp").val(currencyFormat(ans));
}

function PoundsToNaira(){
	var rate=$("#rate").val();
	var gbp=$("#gbp").val();
	var ans;
	ans=gbp * rate;
	$("#ngn").val(currencyFormat(ans));
}

	
function printPage() {
    window.print();
}

function showBenEditForm(){
	$("#benEditForm").toggle();
}

function showIdentification(){
	$("#identification").toggle();
}

function existingSender(){
	var existingSender=$("#existingSenders").val();
	if(existingSender=="new_sender")
	{
		$("#ExtSenderId").val("");
		$("#senderSurname").val("");
		$("#senderSurname").prop("readonly",false);
		$("#senderName").val("");
		$("#senderName").prop("readonly",false);
		$("#senderAddress").val("");
		$("#senderAddress").prop("readonly",false);
		$("#senderPhone").val("");
		$("#senderPhone").prop("readonly",false);
		$("#existingBeneficiary").html("");
	}
	else
	{
		$.post("existing_sender.php",{sender_id:existingSender},function process(data){
			var sender=jQuery.parseJSON(data);
			var senderID=existingSender;
			$("#ExtSenderId").val(sender.sender_id);
			$("#senderSurname").val(sender.fullname);
			$("#senderSurname").prop("readonly",true);
			//$("#senderName").val(sender.name);
			$("#senderName").prop("readonly",true);
			$("#senderAddress").val(sender.address);
			$("#senderAddress").prop("readonly",true);
			$("#senderPhone").val(sender.phone_no);
			$("#senderPhone").prop("readonly",true);
			$("#existingBeneficiary").css("visibility","visible");
			$.post("existing_beneficary.php",{senderid:senderID},function process(data){
			$("#existingBeneficiary").html(data);
	});
});
	}
			$("#ExtBeneficiaryId").val("");
			$("#BenFullname").val("");
			$("#BenFullname").prop("readonly",false);
			$("#BenBank").val("");
			$("#BenBank").prop("readonly",false);
			$("#BenAcctName").val("");
			$("#BenAcctName").prop("readonly",false);
			$("#BenAcctNo").val("");
			$("#BenAcctNo").prop("readonly",false);
}

function existingBeneficiary(){
	var existingBeneficiaryID=$("#extBeneficiary").val();
	if(existingBeneficiaryID=="")
	{
		$("#ExtBeneficiaryId").val("");
			$("#BenFullname").val("");
			$("#BenFullname").prop("readonly",false);
			$("#BenBank").val("");
			$("#BenBank").prop("readonly",false);
			$("#BenAcctName").val("");
			$("#BenAcctName").prop("readonly",false);
			$("#BenAcctNo").val("");
			$("#BenAcctNo").prop("readonly",false);	
	}
	else if(existingBeneficiaryID=="new_beneficiary")
	{
			$("#ExtBeneficiaryId").val("");
			$("#BenFullname").val("");
			$("#BenFullname").prop("readonly",false);
			$("#BenBank").val("");
			$("#BenBank").prop("readonly",false);
			$("#BenAcctName").val("");
			$("#BenAcctName").prop("readonly",false);
			$("#BenAcctNo").val("");
			$("#BenAcctNo").prop("readonly",false);
	}
	else
	{
	$.post("ext_ben_details.php",{beneficiaryid:existingBeneficiaryID},function process(data){
		var beneficiary=jQuery.parseJSON(data);
		$("#ExtBeneficiaryId").val(beneficiary.id);
		$("#BenFullname").val(beneficiary.name);
		$("#BenFullname").prop("readonly",true);
		$("#BenBank").append("<option value=\"" + beneficiary.bank_name + "\" selected=\"selected\">" + beneficiary.bank_name + "</option>");
		$("#read").prop("disabled",true);
		$("#BenBank").prop("readonly",true);
		$("#BenAcctName").val(beneficiary.acct_name);
		$("#BenAcctName").prop("readonly",true);
		$("#BenAcctNo").val(beneficiary.acct_no);
		$("#BenAcctNo").prop("readonly",true);
	});
	}
}

function copyName(){
	$("#BenAcctName").val($("#BenFullname").val());
}

function showEC(){
	$("#ecopy").removeAttr("style");
	$("#e_doc_butt").removeAttr("style");
	$("#hcopy").css("display","none");
	$("#h_doc_butt").css("display","none");
}

function showHC(){
	$("#hcopy").removeAttr("style");
	$("#h_doc_butt").removeAttr("style");
	$("#ecopy").css("display","none");
	$("#e_doc_butt").css("display","none");
}

function edit_sender(){
	$("#senderSurname").prop("readonly",false);
	$("#senderName").prop("readonly",false);
	$("#senderAddress").prop("readonly",false);
	$("#senderPhone").prop("readonly",false);
}

function new_edit_sender(){
	$("#ExtSenderId").val("");
	$("#ExtBeneficiaryId").val("");
	$("#existingBeneficiary").css("visibility","hidden");
	$("#senderSurname").prop("readonly",false);
	$("#senderSurname").val("");
	$("#senderName").prop("readonly",false);
	$("#senderName").val("");
	$("#senderAddress").prop("readonly",false);
	$("#senderAddress").val("");
	$("#senderPhone").prop("readonly",false);
	$("#senderPhone").val("");
	$("#BenFullname").prop("readonly",false);
	$("#BenFullname").val("");
	$("#BenBank").prop("disabled",false);
	$("#BenAcctName").prop("readonly",false);
	$("#BenAcctName").val("");
	$("#BenAcctNo").prop("readonly",false);
	$("#BenAcctNo").val("");
}


function edit_beneficiary(){
	$("#BenFullname").prop("readonly",false);
	$("#BenBank").prop("disabled",false);
	$("#BenAcctName").prop("readonly",false);
	$("#BenAcctNo").prop("readonly",false);
}

function new_edit_beneficiary(){
	$("#ExtBeneficiaryId").val("");
	$("#BenFullname").prop("readonly",false);
	$("#BenFullname").val("");
	$("#BenBank").prop("disabled",false);
	$("#BenAcctName").prop("readonly",false);
	$("#BenAcctName").val("");
	$("#BenAcctNo").prop("readonly",false);
	$("#BenAcctNo").val("");
}

function SenderOps(senderId){
	var selector=senderId;
	var operation=$('#' + selector).val();
	//alert(operation + ", " + senderId);
	switch(operation)
	{
		case "details":
		//window.scroll(0,0);
		$.post("sen_details.php",{sender_id:senderId},process);
		break;
		
		case "ed_details":
		window.scroll(0,0);
		$.post("edit_sender.php",{sender_id:senderId},process);
		break;
		
		case "ben":
		window.scroll(0,0);
		$.post("sen_bens.php",{sender_id:senderId},process);
		break;
		
		case "add_ben":
		window.scroll(0,0);
		$.post("add_ben.php",{sender_id:senderId},process);
		break;
		
		case "docs":
		window.scroll(0,0);
		$.post("docs.php",{sender_id:senderId},process);
		break;
		
		case "upload_doc":
		window.scroll(0,0);
		$.post("upload_doc.php",{sender_id:senderId},process);
		break;
		
		case "history":
		senderId=(btoa(senderId));
		window.location.assign("sender_transactions.php?sender_id=" + senderId);
		break;
		
		case "history":
		senderId=(btoa(senderId));
		window.location.assign("sender_transactions.php?sender_id=" + senderId);
		break;
		
		case "newtrans":
		senderId=(btoa(senderId));
		window.location.assign("new_transaction.php?sender_id=" + senderId);
		break;
		
		case "delete":
		window.scroll(0,0);
		senderId=(btoa(senderId));
		//window.location.assign("delete_sender.php?sender_id=" + senderId);
		var r=confirm("You are about to delete a Customer. All beneficiaries of this customer will also be deleted. All transactions involving the beneficiary will also be deleted. Do you want to continue?");
		if(r==true){
			$.post("delete_sender.php",{sender_id:senderId},process);
			break;
		}
		else
		{
				
		}
	}
}

function process(data,status){
	$("#showOps").html(data);
}

function redirect(){
	window.location.assign("beneficiaries.php");
}

function BenOps(BenId){
	var selector=BenId;
	var operation=$('#' + selector).val();
	//alert(operation + ", " + BenId);
	switch(operation)
	{
		case "ed_ben":
		window.scroll(0,0);
		$.post("edit_ben.php",{ben_id:BenId},process);
		break;
		
		case "change_cus":
		window.scroll(0,0);
		$.post("change_ben_customer.php",{ben_id:BenId},process);
		break;
		
		case "delete":
		window.scroll(0,0);
		confirm("You are about to delete a beneficiary. All transactions involving the beneficiary will also be deleted. Do you want to continue?");
		$.post("delete_ben.php",{ben_id:BenId},process);
		break;
	}
	
}

function benProcess(data,status){
	$("#bens-dialog").html(data);
}

function samePageBenOps(BenId){
	var selector=BenId;
	var operation=$('#' + selector).val();
	//alert(operation + ", " + BenId);
	switch(operation)
	{
		case "ed_ben":
		//window.scroll(0,0);
		$("#bens-dialog").html("<h3 style=\"text-align:center;\">Benficiary's Details Loading...</h3>");
		$("#bens-dialog").dialog('open');
		$.post("edit_ben.php",{ben_id:BenId},benProcess);
		break;
		
		case "change_cus":
		//window.scroll(0,0);
		$("#bens-dialog").html("<h3 style=\"text-align:center;\">Benficiary's Details Loading...</h3>");
		$("#bens-dialog").dialog('open');
		$.post("change_ben_customer.php",{ben_id:BenId},benProcess);
		break;
		
		case "delete":
		//window.scroll(0,0);
		$("#bens-dialog").html("<h3 style=\"text-align:center;\">Benficiary's Details Loading...</h3>");
		$("#bens-dialog").dialog('open');
		var r=confirm("You are about to delete a beneficiary. All transactions involving the beneficiary will also be deleted. Do you want to continue?");
		if(r==true){
			$.post("delete_ben.php",{ben_id:BenId},benProcess);
			break;
		}
		else{
				
		}
	}
	
}


$.ajaxSetup({
    beforeSend:function(){
        // show image here
        $("#loading").show();
    },
    complete:function(){
        // hide image here
        $("#loading").hide();
    }
});

