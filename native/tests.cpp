#include "linear.hpp"
#include <cassert>
#include <cmath>
#include <iostream>
int main(){
 std::vector<Point> d;for(int x=-5;x<=5;++x)d.push_back({double(x),2.0*x+3.0});
 Model m=train(d,.01,3000);
 assert(std::abs(m.slope-2)<.02);assert(std::abs(m.intercept-3)<.02);
 assert(mse(d,m)<.01);
 bool failed=false;try{train({},.01,4);}catch(...){failed=true;}assert(failed);
 std::cout<<"ML tests passed\n";
}