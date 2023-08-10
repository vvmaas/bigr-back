import weightRepository, { CreateWeightParams, UpdateWeightParams } from "@/modules/repositories/weight-repository";
import { badRequestError, notFoundError, unauthorizedError } from "@/errors";
import { log } from "console";

async function getWeight(userId: number) {
  const weight = await weightRepository.findLast(userId);
  if(!weight) throw notFoundError();
  return weight;
} 

//bool ? higher : lower
async function getHigherOrLower(userId: number, bool: boolean) {
  const weight = await weightRepository.findHigherOrLower(userId, bool);
  if(!weight) throw notFoundError();
  return weight;
}

async function getWeightById(id: number) {
  const weight = await weightRepository.findById(id);
  if(!weight) throw notFoundError();
  return weight;
}

async function getWeights(userId: number) {
  const weights = await weightRepository.findAll(userId);
  return weights;
}

async function postWeight(data: CreateWeightParams) {
  const weight = await weightRepository.create(data);
  return weight;
}

async function editWeight(data: UpdateWeightParams, id: number) {
  const weight = await weightRepository.edit(data, id);
  return weight;
} 

async function deleteWeight(id: number) {
  const weight = await weightRepository.erase(id);
  return weight;
}
  
const weightService = {
  getWeights,
  getWeight,
  getWeightById,
  postWeight,
  editWeight,
  deleteWeight,
  getHigherOrLower
}; 
  
export default weightService;
