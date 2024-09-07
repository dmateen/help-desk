import axios from "axios";


const client = axios.create({
  baseURL: 'http://17.17.2.153:8001/', // Replace with your API endpoint
});

class NetworkService {
  static async get(path = "", data, headerOptions, applyRetry = false) {
    let retryCount = applyRetry ? 0 : 2;
    while (retryCount < 3) {
      try {
        const response = await client({
          method: "GET",
          url: path,
          headers: { ...headerOptions },
          data: null,
          ...(!!data && { params: data }),
        });
        if (response.status % 200 < 10 && response.status % 200 >= 0) {
          return response;
        } else {
          if (!!applyRetry && retryCount < 2) {
            retryCount++;
            continue;
          } else {
            return { ...response, error: getErrorString(response) };
          }
        }
      } catch (e) {
        const response = e?.response;
        if (!!applyRetry && retryCount < 2) {
          retryCount++;
          continue;
        } else {
          return { ...e, error: getErrorString(e) };
        }
      }
    }
  }

  static async post(path = "", data = {}, headerOptions) {
    try {
      const response = await client({
        method: "POST",
        url: path,
        ...(!!data && { data }),
        headers: { ...headerOptions },
      });
      return response;
    } catch (e) {
      return { ...e, error: getErrorString(e) };
    }
  }

  static async patch(path = "", data = {}, headerOptions) {
    try {
      const response = await client({
        method: "PATCH",
        url: path,
        ...(!!data && { data: JSON.stringify(data) }),
        headers: { ...headerOptions },
      });
      return response;
    } catch (e) {
      return { ...e, error: getErrorString(e) };
    }
  }

  static async delete(path = "", data = {}, headerOptions) {
    try {
      const response = await client({
        method: "DELETE",
        url: path,
        ...(!!data && { data }),
        headers: { ...headerOptions },
      });
      return response;
    } catch (e) {
      return { ...e, error: getErrorString(e) };
    }
  }

  static async put(path = "", data = {}, headerOptions) {
    try {
      const response = await client({
        method: "PUT",
        url: path,
        data,
        headers: { ...headerOptions },
      });
      return response;
    } catch (e) {
      return { ...e, error: getErrorString(e) };
    }
  }
}

export { client as NetworkClient, NetworkService };
