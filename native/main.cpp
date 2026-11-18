#include "linear.hpp"
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
int main(int argc,char**argv){
 if(argc<2||argc>4){std::cerr<<"Usage: ml_studio data.csv [learning_rate] [epochs]\n";return 2;}
 try{
  std::ifstream file(argv[1]);if(!file)throw std::runtime_error("Cannot read input");
  std::vector<Point> data;std::string line;
  while(std::getline(file,line)){
   if(line.empty()||line[0]=='#'||line=="x,y")continue;
   std::stringstream row(line);std::string x,y;
   if(!std::getline(row,x,',')||!std::getline(row,y,','))throw std::runtime_error("Invalid CSV");
   data.push_back({std::stod(x),std::stod(y)});
  }
  auto model=train(data,argc>2?std::stod(argv[2]):.001,argc>3?std::stoi(argv[3]):4000);
  std::cout<<"slope="<<model.slope<<" intercept="<<model.intercept<<" mse="<<mse(data,model)<<"\n";
 }catch(const std::exception&e){std::cerr<<e.what()<<"\n";return 1;}
}