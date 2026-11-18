#pragma once
#include <vector>
struct Point {double x,y;};
struct Model {double slope=0,intercept=0;std::vector<double> losses;double predict(double x) const{return slope*x+intercept;}};
Model train(const std::vector<Point>& points,double learningRate,int epochs);
double mse(const std::vector<Point>& points,const Model& model);
