let cart = [];

let dataProduct = [
  { name: "telur", price: 3000, quantity: 10 },
  { name: "minyak", price: 10000, quantity: 4 },
  { name: "mie", price: 3200, quantity: 8 },
  { name: "susu", price: 6000, quantity: 5 },
  { name: "yakult", price: 3600, quantity: 5 },
  { name: "lays", price: 7300, quantity: 7 },
  { name: "chitato", price: 7200, quantity: 6 },
];

const isValidName = (name) => {
  return typeof name === "string" && name.trim().length > 0;
};

const isValidQty = (qty) => {
  return typeof qty === "number" && !isNaN(qty) && qty > 0;
};

const findIndexProduct = (userInput, arr) => {
  const dataUser = userInput.toLowerCase();

  for (let i = 0; i < arr.length; i++) {
    const nameData = arr[i].name.toLowerCase();

    if (nameData === dataUser) {
      return i;
    }
  }
  return -1;
};

const addProductToCart = (userInput) => {
  if (!isValidName(userInput.name) || !isValidQty(userInput.quantity)) {
    console.log("Input tidak valid. Pastikan nama dan jumlah benar.");
    return;
  }

  const marketIndex = findIndexProduct(userInput.name, dataProduct);
  const cartIndex = findIndexProduct(userInput.name, cart);
  const product = {
    name: userInput.name,
    quantity: userInput.quantity,
  };

  if (marketIndex === -1) {
    console.log(`${product.name} not found`);
  } else {
    const currentQty = dataProduct[marketIndex].quantity;

    if (product.quantity > currentQty) {
      console.log(`not enough quantity for ${product.name}`);
    } else {
      if (cartIndex === -1) {
        cart.push(product);
        dataProduct[marketIndex].quantity -= product.quantity;
        console.log(
          `new product: ${product.quantity} ${product.name} added to cart`,
        );
      } else if (product.quantity === currentQty) {
        cart[cartIndex].quantity += product.quantity;
        dataProduct[marketIndex].quantity -= product.quantity;
        console.log(`product ${product.name} diborong habis`);
      } else {
        cart[cartIndex].quantity += product.quantity;
        dataProduct[marketIndex].quantity -= product.quantity;
        console.log(`${product.quantity} ${product.name} added to cart`);
      }
    }
  }
};

const removeProductFromCart = (userInput) => {
  if (!isValidName(userInput.name) || !isValidQty(userInput.quantity)) {
    console.log("Input tidak valid. Pastikan nama dan jumlah benar.");
    return;
  }

  const cartIndex = findIndexProduct(userInput.name, cart);
  const marketIndex = findIndexProduct(userInput.name, dataProduct);
  const product = {
    name: userInput.name,
    quantity: userInput.quantity,
  };

  if (cartIndex === -1) {
    console.log(`${product.name} not found`);
    return;
  } else {
    const currentCartQty = cart[cartIndex].quantity;
    if (product.quantity > currentCartQty) {
      console.log(`not enough quantity for ${product.name}`);
    } else if (product.quantity === currentCartQty) {
      cart.splice(cartIndex, 1);
      dataProduct[marketIndex].quantity += product.quantity;
      console.log(`product ${product.name} deleted from cart`);
    } else {
      cart[cartIndex].quantity -= product.quantity;
      dataProduct[marketIndex].quantity += product.quantity;
      console.log(
        `quantity: ${product.quantity} of the ${product.name} removed from cart`,
      );
    }
  }
};

const showAvailableProduct = () => {
  console.log("=== DAFTAR PRODUK DI MARKET ===");
  dataProduct.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name} - ${item.price} ${item.quantity} tersedia`,
    );
  });
};

let action;

alert("tekan f12 untuk melihat hasilnya");
alert("disarankan mengetik 'show terlebih dahulu");

do {
  action = prompt("Apa yang ingin kamu lakukan?(show/check/add/remove/stop)")
    .toLowerCase()
    .trim();

  if (action === "check") {
    console.clear();

    let targetLocation = prompt("Mau cek dimana? cart / market").toLowerCase();
    let productNameInput = prompt("apa yang ingin kamu cek?");

    if (targetLocation === "market") {
      const marketIndex = findIndexProduct(productNameInput, dataProduct);

      if (marketIndex !== -1) {
        const item = dataProduct[marketIndex];
        console.log(`${item.name} ada, quantity: ${item.quantity}`);
      } else {
        console.log(`${productNameInput} tidak ditemukan di market`);
      }

      console.log(findIndexProduct(productNameInput, dataProduct));
    } else if (targetLocation === "cart") {
      const cartIndex = findIndexProduct(productNameInput, cart);

      if (cartIndex !== -1) {
        const item = cart[cartIndex];
        console.log(`${item.name} ada, quantity: ${item.quantity}`);
      } else {
        console.log(`${productNameInput} tidak ditemukan di cart`);
      }

      console.log(findIndexProduct(productNameInput, cart));
    } else if (targetLocation !== "cart" && targetLocation !== "market") {
      alert("input tidak valid");
    }

    showAvailableProduct();
  } else if (action === "add") {
    let productNameInput = prompt("apa yang ingin beli?");
    let productQtyInput = Number(
      prompt(
        `masukan jumlah untuk ${productNameInput} yang kamu mau beli (dalam angka)`,
      ),
    );

    console.clear();

    addProductToCart({
      name: productNameInput,
      quantity: productQtyInput,
    });

    showAvailableProduct();
  } else if (action === "remove") {
    let productNameInput = prompt("apa yang ingin hapus?");
    let productQtyInput = Number(
      prompt(
        `masukan jumlah untuk ${productNameInput} yang kamu mau hapus (dalam angka)`,
      ),
    );

    console.clear();

    removeProductFromCart({
      name: productNameInput,
      quantity: productQtyInput,
    });

    showAvailableProduct();
  } else if (action === "show") {
    showAvailableProduct();
  } else if (action !== "stop") {
    alert("input tidak valid");
  }
} while (action !== "stop");

console.clear();

console.log("Terimakasih sudah berbelanja. Ini isi cart kamu");
cart.forEach((item, i) => {
  console.log(`${i + 1}. ${item.name} - ${item.quantity}`);
});

let total = 0;
cart.forEach((item) => {
  const marketIndex = dataProduct.findIndex((p) => p.name === item.name);

  if (marketIndex !== -1) {
    const price = dataProduct[marketIndex].price;
    const subtotal = price * item.quantity;
    total += subtotal;
  }
});

console.log(`\nTotal belanjaanmu: Rp.${total.toLocaleString("id-ID")}`);
