import weightRepository, { CreateWeightParams, UpdateWeightParams } from "@/modules/repositories/weight-repository";
import { badRequestError, notFoundError, unauthorizedError } from "@/errors";

async function getWeights(userId: number) {
  const weights = await weightRepository.findAll(userId);
  return weights;
}

async function postWeight(data: CreateWeightParams) {
  if(data.value <= 0) throw badRequestError();
  const weight = await weightRepository.create(data);
  return weight;
}

async function editWeight(data: UpdateWeightParams, id: number) {
  if(data.value <= 0) throw badRequestError();
  const weight = await weightRepository.edit(data, id);
  return weight;
}

async function deleteWeight(id: number) {
  const weight = await weightRepository.erase(id);
  return weight;
}
  
const weightService = {
  getWeights,
  postWeight,
  editWeight,
  deleteWeight,
};
  
export default weightService;
