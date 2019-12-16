const panganan = document.querySelector('#bag1');
const selecttable = document.getElementById('ram');
const selecttotal = document.querySelector('#total-price');
const selectpay = document.querySelector('#total-pay');
const selecttax = document.querySelector('#total-tax');
const selectdiscount = document.querySelector('#discount');
const totalitem = document.querySelector('#total-item');
// const totalqty = document.querySelector('#qty');
// console.log(panganan)
let pembelian = 0;
let totalitems = 0;
let idproduct = 0;
let idtotal = 0;
let idharga = 0;
let hasil = 0;

let makanan = {
    foods: [{
            id: 1,
            img: 'product/p2.jpg',
            description: 'JamTangan',
            harga: 2000
        },
        {
            id: 2,
            img: 'product/p3.jpg',
            description: 'Tas',
            harga: 3000
        },
        {
            id: 3,
            img: 'product/p4.jpg',
            description: 'Kacamata',
            harga: 1500
        },
        {
            id: 4,
            img: 'product/p5.jpg',
            description: 'SepatuOlahraga',
            harga: 3500
        },
        {
            id: 5,
            img: 'product/p6.jpg',
            description: 'Sepatu',
            harga: 5700
        },
        {
            id: 6,
            img: 'product/p7.jpg',
            description: 'Kemeja',
            harga: 2300
        },
        {
            id: 7,
            img: 'product/p8.jpg',
            description: 'JaketBulu',
            harga: 7350
        },
        {
            id: 8,
            img: 'product/p9.jpg',
            description: 'Kalung',
            harga: 4600
        },
        {
            id: 9,
            img: 'product/p10.jpg',
            description: 'Syal',
            harga: 1230
        },
        {
            id: 10,
            img: 'product/p11.jpg',
            description: 'KacamataStylist',
            harga: 5600
        },
        {
            id: 11,
            img: 'product/p12.jpg',
            description: 'RokPendek',
            harga: 3200
        },
        {
            id: 12,
            img: 'product/p13.jpg',
            description: 'KemejaCewek',
            harga: 1260
        },
    ],
    foodLogs() {
        this.foods.forEach(food => {
            panganan.innerHTML += `<div class="card">
        <div class="card-header">
          <img onclick= insert(${food.id},${food.harga},"${food.description}") src="${food.img}" alt="">
        </div>
        <div class="card-food">${food.harga}</div>
        <div class="card-price">${food.description}</div>
      </div>`;
        });
    }
};
// kata

makanan.foodLogs();

let hasilqty = () => {
    let arr = document.getElementsByName('qty');
    let totalqty = 0;
    for (let i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].value)) {
            totalqty += parseInt(arr[i].value)
        }
        totalitem.innerHTML = "Total Qty " + totalqty + " from " + pembelian;
    }
}

let resettotal = () => {
    let row = document.getElementById('nilai');
    sumhsl = 0;
    for (let i = 1; i < row.rows.length; i++) {
        sumhsl = sumhsl + Number(row.rows[i].cells[3].innerHTML);
    }
    let pajak = sumhsl * 10 / 100;
    let discount = sumhsl * 20 / 100;
    selectdiscount.innerHTML = discount;
    selecttax.innerHTML = pajak;
    selecttotal.innerHTML = sumhsl;
    selectpay.innerHTML = sumhsl + pajak - discount;


}



let insert = (id, harga, description) => {

    idproduct = id;
    idtotal = id;
    idharga = id;
    totalitems = id;
    // const items = totalitems;
    const hargaid = String("harga_" + idharga);
    const totalid = String("total_" + idtotal);

    const keranjang = document.querySelectorAll('#ram tr');

    let Nextrow = () => {
        const tr = document.createElement("tr");
        tr.setAttribute('id', `product-${idproduct}`);
        tr.setAttribute('class', `${description}`);
        tr.innerHTML = `
        <td>${description}</td> 
        <td><input data-id="${idproduct}" type="number" onInput="input(this, ${totalid},${harga})" name="qty" id="qty_${idproduct}" min="1" max="100"  style="width:50px; text-align:center"  value="1"></td>
        <td id="${hargaid}">${harga}</td>
        <td class="tottals" id="${totalid}">${harga}</td>
        <td><button onclick= "del(${idproduct})" style="width:70px">Delete</button></td>`;
        selecttable.appendChild(tr);
        pembelian += 1;
        totalitem.innerHTML = "total QTY " + pembelian;

    }

    if (keranjang.length > 0) {
        let duplikat = false;
        keranjang.forEach(card => {
            if (card.getAttribute('id') == `product-${id}`) {
                duplikat = true;
            }
        });

        if (duplikat == true) {
            const inputer = document.querySelector(`#product-${id} input[data-id="${id}"]`);
            const totalsemua = document.querySelector(`#${totalid}`);
            let valid = Number(inputer.value) + 1;
            inputer.value = valid;
            totalsemua.innerHTML = valid * `${harga}`;
            // console.log(inputer.innerHTML)
        } else {
            Nextrow();
        }

    } else {
        Nextrow();
    }
    resettotal();
    hasilqty();
};


const input = (elt, total, harga) => {
    // pembelian +=1;
    // totalitems = id;
    // const items = totalitems;
    const ids = elt.getAttribute(`data-id`);
    // console.log(ids);
    // totalitem.innerHTML = "total QTY " + pembelian;
    const value = elt.value;
    const tol = total.getAttribute('id');
    const selecttot = document.getElementById(tol);
    const hargaawal = harga * value;
    selecttot.innerHTML = hargaawal;
    const idd = document.querySelectorAll('.tottals');
    idd.forEach(id => {
        resettotal();
    })
    // console.log(hargaawal)
    hasilqty();
}

const del = (id) => {
    pembelian -= 1;
    totalitem.innerHTML = pembelian;
    const idproduct = String(id);
    const selectid = document.getElementById(`product-${idproduct}`);
    selectid.remove();
    resettotal();
    hasilqty();
}

let printout = () => {
    let objFra = document.getElementById('ram');
    objFra.contentWindow.focus();
    objFra.contentWindow.print();
}
console.log(print)