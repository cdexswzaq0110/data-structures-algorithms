![image](https://github.com/user-attachments/assets/54aa0d46-1218-4528-849e-8919be9994b7)
```
#include<iostream>//對齊右邊 
using namespace std;
int main(){
     int height;
     cout<<"請輸入三角形高度=> ";
     cin>>height;
     cout<<endl;
     for(int i=1;i<=height;i++){
         for(int j=1;j<=height-i;j++){
             cout<<' ';
         }
         for(int j=1;j<=i;j++){
             cout<<'*';
         }
	 cout<<endl;
     } 
     return 0;
}
```
----------------------------------------------------------
![image](https://github.com/user-attachments/assets/8cfd3aa4-cfb7-4bc6-bc12-341c00bbcc55)
```
#include<iostream>////倒三角形對齊左
using namespace std;
int main(){
     int height;
     cout<<"請輸入三角形高度=> ";
     cin>>height;
     cout<<endl;
     for(int i=0;i<=height;i++){
         for(int j=1;j<=i;j++){
             cout<<' ';
         } 
         for(int j=1;j<=height-i;j++){
             cout<<'*';
         }		
         cout<<endl;
     } 
     return 0;
}
```
--------------------------------------------------------------
![image](https://github.com/user-attachments/assets/252465d6-8a2e-4cc4-b8c7-f5f4de7a0902)
```
#include<iostream>//對齊左邊 
using namespace std;
int main(){
     int height;
     cout<<"請輸入三角形高度=> ";
     cin>>height;
     cout<<endl;
     for(int i=1;i<=height;i++){
	 for(int j=1;j<=i;j++){
             cout<<'*';
	 }		
	 cout<<endl;
     } 
     return 0;
}
```
--------------------------------------------------------------
![image](https://github.com/user-attachments/assets/03380a32-8b19-442b-951e-21dc28647bc1)
```
#include<iostream>//倒三角形對齊左 
using namespace std;
int main(){
     int height;
     cout<<"請輸入三角形高度=> ";
     cin>>height;
     cout<<endl;
     for(int i=0;i<=height;i++){
	 for(int j=1;j<=height-i;j++){
	     cout<<'*';
         }		
	 cout<<endl;
     } 
     cout<<endl;
     return 0;
}
```
--------------------------------------------------------------
![image](https://github.com/user-attachments/assets/a4abb899-0b6c-461b-94d1-5ea28c483198)
```
#include<iostream>//左右對齊 
using namespace std;
int main(){
     int height;
     cout<<"請輸入三角形高度=> ";
     cin>>height;
     for(int i=1;i<=height;i++){
	 for(int j=1;j<=height-i;j++){
	     cout << ' ';
         }
         for(int j=1;j<=2*i-1;j++){
             cout<<'*';
         }
         cout << endl;
     } 
     return 0;
}
```
--------------------------------------------------------------
![image](https://github.com/user-attachments/assets/1fdc1cd9-0ceb-49d0-b6c5-1005f2ccf164)
```
#include<iostream>//兩個左右對齊 
using namespace std;
int main(){
     int h;
     cout<<"請輸入三角形高度=> ";
     cin>>h;
     cout<<endl;
     for(int i=1;i<=h;i++){
         for(int j=1;j<=h-i;j++){
             cout<<' ';
         }
         for(int j=1;j<=2*i-1;j++){
             cout<<'*';
	 }
         for(int j=1;j<=h-i;j++){
             cout<<' ';
	     cout<<' ';
	 }
	 for(int j=1;j<=2*i-1;j++){
             cout<<'*';
	 }
	 cout<<endl;
     } 
     return 0;
}
```
-----------------------------------------------------------
![image](https://github.com/user-attachments/assets/d003dcbb-6adb-41f4-b13e-59aaa79029ab)
```
#include<iostream>//空心三角形 
using namespace std;
int main(){
     int height;
     cout<<"請輸入三角形高度=> ";
     cin>>height;
     cout<<endl;
     for(int i=1;i<=height;i++){
         for(int j=1;j<=2*height-1;j++){
             if(i+j==height+1||j-i==height-1||i==height) //左斜邊、右斜邊、底邊 
                 cout<<"*";
             else
		 cout<<" ";
         }
	 cout<<endl;
     }
     return 0;
}
```




