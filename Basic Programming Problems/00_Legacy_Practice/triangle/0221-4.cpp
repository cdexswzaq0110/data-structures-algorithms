#include<iostream>//4.
using namespace std;
int main(){
	int height;
	cout<<"Please enter the triangle height=> ";
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

/*

e.g. h=5
    * 
   * * 
  *   * 
 *     * 
*********

*/
