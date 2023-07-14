import axios from 'axios';
import { environment } from '../../environments/environment';

export const instant = axios.create({
  baseURL: environment.baseURL,
});

export default instant;
