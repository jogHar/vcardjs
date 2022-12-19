class Address {
    // All optional
    type = []  // 'dom'|'intl'|'postal'|'parcel'|'home'|'work'
    street = '';
    locality = '';
    region = '';
    postal = '';
    country = '';

    constructor(type, street, locality, region, postal, country) {
        this.type = type;
        this.street = street;
        this.locality = locality;
        this.region = region;
        this.postal = postal;
        this.country = country;
    }

    get addressString() {
        return 'ADR;TYPE='+this.type.join(',')+':;;'+this.street+';'+this.locality+';'+this.region+';'+this.postal+';'+this.country
    }
}

class VCard3{
    namePrefix='' // optional
    fname = ''; // required
    lname = ''; // required
    address = []; // optional
    birthday = ''; // optional YYYY-MM-DD
    email = ''; // optional
    tel = ''; // optional
    url = ''; // optional

    constructor() {}

    addAddress(address) {
        this.address.push(address);
    }

    get formattedNameString() {
        return 'N:'+this.fname +' '+ this.lname;
    }

    get nameString() {
        return 'FN:'+this.lname+';'+this.fname+';;'+this.namePrefix+';';
    }

    get birthdayString() {
        return 'BDAY:'+this.birthday;
    }

    get emailString() {
        return 'EMAIL;TYPE=internet:'+this.email;
    }

    get telString() {
        return 'TEL;TYPE=cell:'+this.tel;
    }

    get urlString() {
        return 'URL:'+this.url;
    }

    get addressString() {
        let address = ''
        this.address.forEach(add => {
            address = address + add.addressString+'\n';
        });
        return address;
    }

    get vcardString() {
        return 'BEGIN:VCARD\n'+
        'VERSION:3.0\n'+
        this.nameString+'\n'+
        this.formattedNameString+'\n'+
        this.addressString+
        this.birthdayString+'\n'+
        this.emailString+'\n'+
        this.telString+'\n'+
        this.urlString+'\n'+
        'END:VCARD'
    }
    // encodeURIComponent

    getQR() {
        return 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl='+encodeURIComponent(this.vcardString)
    }

    downloadCard() {
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([this.vcardString], {type: 'text/vcf'}));
        a.download = this.fname+' '+this.lname+'.vcf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}