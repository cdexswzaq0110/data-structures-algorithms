#include<iostream>
using namespace std;
int main(){
	int height;
	cout<<"Please enter the triangle height=> ";
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

/*

e.g. h=5
***** 
 **** 
  *** 
   ** 
    * 
 
*/
