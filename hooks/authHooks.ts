import { ILogin, ISignUp } from "@/interface/authTypes";
import { routes } from "@/shared/constants/routes";
import { get_requests, post_requests } from "@/shared/helpers/axios_helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (data: ILogin) => post_requests(routes.login, data),
  });

  return mutation;
};

export const useProfile = () => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => get_requests(routes.user, token),
    enabled: !!token,
  });

  return {
    profileData: data?.data,
    isLoading,
    isError,
  };
};

export const useGithubLogin = () => {
  const githubMutation = useMutation({
    mutationFn: (data: { code: string }) =>
      post_requests(routes.githubLogin, data),
  });

  return githubMutation;
};

export const useSignUp = () => {
  const signUpMutation = useMutation({
    mutationFn: (data: ISignUp) => post_requests(routes.signup, data),
  });

  return signUpMutation;
};
