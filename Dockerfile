FROM ubuntu:22.04 AS build

RUN apt-get update \
    && apt-get install -y dotnet-sdk-8.0 wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . /app

WORKDIR /app/API

RUN dotnet publish -o out -c Development

FROM redhat/ubi8-minimal:8.9

RUN microdnf install shadow-utils
RUN microdnf install aspnetcore-runtime-8.0 -y

RUN groupadd redhat-user
RUN useradd -s /bin/bash --uid 1001 -g redhat-user redhat-user 

COPY --from=build /app/API/out /app/API/out
COPY --from=build /app/Infrastructure/Data/SeedData /app/API/out/wwwroot/SeedData

COPY --from=build /app/Secrets/https /root/.aspnet/https

COPY --from=build /app/Secrets/https /app/API/out/Certificates

RUN chown -R redhat-user:redhat-user /app 

USER redhat-user
WORKDIR /app/API/out
EXPOSE 5001
CMD ["dotnet", "API.dll"]