#include "linear.hpp"
#include <cmath>
#include <stdexcept>
double mse(const std::vector<Point>& points,const Model& model){
 if(points.empty())throw std::invalid_argument("No training samples");
 double total=0;for(const auto&p:points){double e=model.predict(p.x)-p.y;total+=e*e;}
 return total/points.size();
}
Model train(const std::vector<Point>& points,double learningRate,int epochs){
 if(points.empty()||!std::isfinite(learningRate)||learningRate<=0||epochs<1||epochs>1000000)throw std::invalid_argument("Invalid training settings");
 Model model;
 for(int epoch=0;epoch<epochs;++epoch){
  double dw=0,db=0;
  for(const auto&p:points){double e=model.predict(p.x)-p.y;dw+=e*p.x;db+=e;}
  dw*=2.0/points.size();db*=2.0/points.size();
  model.slope-=learningRate*dw;model.intercept-=learningRate*db;
  double loss=mse(points,model);if(!std::isfinite(loss))throw std::runtime_error("Divergent training: lower learning rate");
  if(epoch%10==0||epoch==epochs-1)model.losses.push_back(loss);
 }
 return model;
}
