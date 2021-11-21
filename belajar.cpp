#include <iostream>
#include <string.h>

int main (){
int menu, pesanan, kopi, susu, teh, total;
  
  
  cout << "===== Menu Viery de Cafee =====" << endl;
  cout << "-------------------------------" << endl;
  cout << "========= Daftar Menu =========" << endl;
  cout << " 1. Kopi " << endl;
  cout << " 2. Susu " << endl;
  cout << " 3. Teh " << endl;
  cout << "===============================" << endl;
  
  cout << "Masukkan Pesanan Anda = ";
  cin >> pesanan;
  if (pesanan == 1) {
    cout << " Kopi Rp 5.000 " << endl;
    harga = 5.000;
  }
  else if (pesanan == 2) {
    cout << " Susu Rp 6.000 " << endl;
    harga = 6.000;
  }
  else if (pesanan == 3) {
    cout << " Teh Rp 4.000 " << endl;
    harga = 4.000;
  }
  else {
    cout << " Pesanan Tidak Tersedia " << endl;
  }
  
  cout << " Masukkan Jumlah Pesanan Anda = ";
  cin >> jumlah;
  
  cout << "------------------------------" << endl;
  total = harga*jumlah;
  cout << " Total Biaya Pesanan Anda Adalah = " << total << endl;
  
  return 0;
}
